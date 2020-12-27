export type WalletAction = 'spend' | 'earn' | 'set_manually';

export type HistoryRecord = {
  type: WalletAction;
  amount: number;
  label: string;
};

export type HistoryBlockType = {
  date: string;
  records: HistoryRecord[];
};

export type CurrencyType = 'USD' | 'RUB';

export type UserWallet = {
  amount: number;
  currency: CurrencyType;
};
