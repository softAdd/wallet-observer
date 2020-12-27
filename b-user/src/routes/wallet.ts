import { json, Router, Response } from 'express';
import { WalletType, HistoryType } from '../mongo-models';
import { findUserWallet, createUserWallet, patchUserWallet, DEFAULT_USER_WALLET } from '../queries/wallet';
import { findUserHistory, createUserHistory, patchUserHistory } from '../queries/history';
import { HistoryRecord, WalletAction } from '../schemas/History';
import { authenticateToken, getUserByToken } from './utils';

const walletRouter = Router();

walletRouter.use(json());
walletRouter.use(authenticateToken);

walletRouter.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

const sendWallet = async (username: string, res: Response) => {
  const wallet = await findUserWallet(username);

  if (!wallet) {
    await createUserWallet(username);
    await createUserHistory(username);
    res.send(DEFAULT_USER_WALLET);
  } else {
    res.send({
      amount: wallet.amount,
      currency: wallet.currency,
    });
  }
}

walletRouter.get('/wallet', async (req, res) => {
  try {
    const user = await getUserByToken(req);
    user ? sendWallet(user.name, res) : res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

const calcAmount = (
  type: WalletAction,
  amount: number,
  walletValue: number
) => {
  switch (type) {
    case 'earn':
      return walletValue + amount;
    case 'spend':
      return walletValue - amount;
    case 'set_manually':
      return amount;
    default:
      return walletValue;
  }
};

const writeToUserHistory = async (username: string, history: HistoryType, record: HistoryRecord) => {
  const date = new Date().toLocaleDateString('ru');
  const blockIndex = history.blocks.findIndex((block) => block.date === date);
  // has block with today date
  if (blockIndex !== -1) {
    // block with today history
    const todayHistory = history.blocks[blockIndex];
    todayHistory.records = [record, ...todayHistory.records];
    // today history with new record
    const nextBlocks = [...history.blocks];
    nextBlocks.splice(blockIndex, 1, todayHistory);

    await patchUserHistory(username, {
      blocks: nextBlocks,
    });
  } else {
    await patchUserHistory(username, {
      blocks: [{ date, records: [record] }, ...history.blocks],
    });
  }
}

walletRouter.post('/operation', async (req, res) => {
  try {
    const record = req.body as HistoryRecord;
    const user = await getUserByToken(req);
    const wallet = user && await findUserWallet(user.name);
    const history = user && await findUserHistory(user.name);

    if (user && wallet && history) {
      await writeToUserHistory(user.name, history, record);
      await patchUserWallet(user.name, { amount: calcAmount(record.type, record.amount, wallet.amount) });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

walletRouter.put('/currency', async (req, res) => {
  try {
    const currency = req.body.currency as WalletType['currency'];
    const user = await getUserByToken(req);
    const wallet = user && await findUserHistory(user.name);
    (user && wallet) ? await patchUserWallet(user.name, { currency }) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  }
});

walletRouter.get('/wallet-history', async (req, res) => {
  try {
    const user = await getUserByToken(req);
    const history = user && await findUserHistory(user.name);
    (user && history) ? res.send(history.blocks) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default walletRouter;