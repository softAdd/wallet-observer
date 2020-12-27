import React, { FC } from 'react';
import { Typography, useTheme, Box } from '@material-ui/core';
import { UserWallet } from 'common/types/wallet';
import { CURRENCY_NOTATION } from 'common/constants';

export const MoneyTitle: FC<{ wallet: UserWallet }> = ({ wallet }) => {
  const theme = useTheme();
  const { amount, currency } = wallet;

  const balanceColor =
    amount >= 0 ? theme.palette.success.main : theme.palette.error.main;

  return (
    <Box padding={3} borderBottom="1px solid #e3e3e3">
      <Box color={balanceColor}>
        <Typography variant="h6">
          {`${CURRENCY_NOTATION.get(currency)} ${amount}`}
        </Typography>
      </Box>
    </Box>
  );
};
