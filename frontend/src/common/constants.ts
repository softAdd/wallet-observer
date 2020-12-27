import { TFunction } from 'i18next';
import { CurrencyType, WalletAction } from './types/wallet';

export const LANGS = ['en', 'ru'] as const;

export const CURRENCY_NOTATION = new Map<CurrencyType, string>([
  ['RUB', '₽'],
  ['USD', '$'],
]);

export const HISTORY_LABEL = (action: WalletAction, t: TFunction) => {
  switch (action) {
    case 'earn':
      return t('earn');
    case 'set_manually':
      return t('set manually');
    case 'spend':
      return t('spend');
    default:
      return '';
  }
};
