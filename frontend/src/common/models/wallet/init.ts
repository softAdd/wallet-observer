import { getWallet, postOperation, getHistoryBlocks } from 'common/api/wallet';
import {
  $wallet,
  $walletHistory,
  requestUserWalletFx,
  postWalletOperationFx,
  requestWalletHistoryFx,
} from './store';

requestUserWalletFx.use(async () => {
  const { data } = await getWallet();
  return data;
});

postWalletOperationFx.use(async (record) => {
  const { data } = await postOperation(record);
  requestUserWalletFx();
  return data;
});

requestWalletHistoryFx.use(async () => {
  const { data } = await getHistoryBlocks();
  return data;
});

$wallet.on(requestUserWalletFx.doneData, (_, wallet) => wallet);
$walletHistory.on(requestWalletHistoryFx.doneData, (_, history) => history);
