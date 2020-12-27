import { createStore, createEffect } from 'effector';
import {
  UserWallet,
  HistoryRecord,
  HistoryBlockType,
} from 'common/types/wallet';

export const $wallet = createStore<UserWallet | null>(null);
export const requestUserWalletFx = createEffect<void, UserWallet>();
export const postWalletOperationFx = createEffect<HistoryRecord, void>();

export const $walletHistory = createStore<HistoryBlockType[] | null>(null);
export const requestWalletHistoryFx = createEffect<void, HistoryBlockType[]>();
