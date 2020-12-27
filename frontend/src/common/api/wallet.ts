import axios from 'common/axios';
import {
  UserWallet,
  WalletAction,
  CurrencyType,
  HistoryBlockType,
} from 'common/types/wallet';

export const getWallet = () => axios.get<UserWallet>('/api/wallet');

export type OperationParams = {
  type: WalletAction;
  label: string;
  amount: number;
};

export const postOperation = (params: OperationParams) =>
  axios.post('/api/operation', params);

export type CurrencyParams = {
  currency: CurrencyType;
};

export const putCurrency = (params: CurrencyParams) =>
  axios.put('/api/currency', params);

export const getHistoryBlocks = () =>
  axios.get<HistoryBlockType[]>('/api/wallet-history');
