import React, { FC, useEffect } from 'react';
import { Box, Grid, useTheme } from '@material-ui/core';
import { useStore } from 'effector-react';
import { $walletHistory, requestWalletHistoryFx } from 'common/models/wallet/store';
import { WarningPlate } from 'common/components/WarningPlate';
import { useTranslation } from 'react-i18next';
import { $categories, getCategoriesFx } from 'common/models/categories/store';
import { Filters } from './Filters';
import { SimpleLineChart } from './LineChart';
import { setFilters } from './store';
import './store/init';

const Charts: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const categories = useStore($categories);
  const history = useStore($walletHistory);

  useEffect(() => {
    requestWalletHistoryFx();
    getCategoriesFx();
    return () => {
      setFilters([]);
    };
  }, []);

  if (!history || !categories) {
    return null;
  }

  if (history.length < 2) {
    return (
      <WarningPlate>{t('Not enough data')}</WarningPlate>
    );
  }

  return (
    <Box p={3}>
      <Box mb={2}>
        <Filters />
      </Box>
      <Grid container spacing={2}>
        <Grid item>
          <SimpleLineChart
            title={t('Earnings')}
            recordType="earn"
            historyBlocks={history}
            lineStroke={theme.palette.success.main}
          />
        </Grid>
        <Grid item>
          <SimpleLineChart
            title={t('Spendings')}
            recordType="spend"
            historyBlocks={history}
            lineStroke={theme.palette.error.dark}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Charts;
