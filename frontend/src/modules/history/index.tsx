import React, { FC, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useStore } from 'effector-react';
import { WarningPlate } from 'common/components/WarningPlate';
import {
  $wallet,
  $walletHistory,
  requestUserWalletFx,
  requestWalletHistoryFx,
} from 'common/models/wallet/store';
import { useTranslation } from 'react-i18next';
import { HistoryBlock } from './HistoryBlock';

const History: FC = () => {
  const { t } = useTranslation();
  const history = useStore($walletHistory);
  const wallet = useStore($wallet);

  useEffect(() => {
    requestWalletHistoryFx();
    requestUserWalletFx();
  }, []);

  if (history === null || wallet === null) {
    return null;
  }

  if (history.length === 0) {
    return <WarningPlate>{t('No entries yet')}</WarningPlate>;
  }

  return (
    <Box py={3} px={2}>
      {history.map(({ date, records }) => (
        <HistoryBlock key={date} date={date} records={records} />
      ))}
    </Box>
  );
};

export default History;
