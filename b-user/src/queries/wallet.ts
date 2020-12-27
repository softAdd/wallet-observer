import { WalletModel, WalletType } from '../mongo-models';

type DefaultUserWalletType = {
  amount: WalletType['amount'];
  currency: WalletType['currency'];
}

export const DEFAULT_USER_WALLET: DefaultUserWalletType = {
  amount: 0,
  currency: 'RUB',
}

export const createUserWallet = (username: string) => {
  return WalletModel.create({ username, ...DEFAULT_USER_WALLET });
}

export const findUserWallet = (username: WalletType['username']) => {
  return WalletModel.findOne({ username }).select('-_id -__v').lean().exec() as Promise<WalletType | null>;
}

export const patchUserWallet = (username: string, settingsToPatch: Partial<Pick<WalletType, 'amount' | 'currency'>>) => {
  return WalletModel.updateOne({ username }, settingsToPatch);
}
