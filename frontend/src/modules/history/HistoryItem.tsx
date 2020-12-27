import React, { FC, useState } from 'react';
import { Box, Typography, useTheme, Divider, makeStyles, createStyles } from '@material-ui/core';
import { HistoryRecord, UserWallet } from 'common/types/wallet';
import { CURRENCY_NOTATION, HISTORY_LABEL } from 'common/constants';
import { $wallet } from 'common/models/wallet/store';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() =>
  createStyles({
    columns: {
      display: 'grid',
      gridTemplateColumns: '150px 1fr',
    }
  })
);

export const HistoryItem: FC<HistoryRecord & { lastItem: boolean }> = ({
  amount,
  label,
  type,
  lastItem,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();
  const [hover, setHover] = useState(false);
  const wallet = useStore($wallet) as UserWallet;

  return (
    <Box
      bgcolor={hover ? theme.palette.grey[100] : undefined}
      style={{ cursor: 'pointer ' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box px={1} pb={lastItem ? 1.5 : undefined}>
        <div className={classes.columns}>
          <Typography variant="caption" gutterBottom style={{ color: theme.palette.grey[500] }}>{HISTORY_LABEL(type, t)}</Typography>
        </div>
        <div className={classes.columns}>
          <Typography variant="body2">
            {`${CURRENCY_NOTATION.get(wallet.currency)} ${amount}`}
          </Typography>
          <Typography variant="body2">{label}</Typography>
        </div>
      </Box>
      {!lastItem && (
        <Box pt={1}>
          <Divider />
        </Box>
      )}
    </Box>
  );
};
