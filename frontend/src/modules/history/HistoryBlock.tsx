import React, { FC } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import { HistoryRecord } from 'common/types/wallet';
import { HistoryItem } from './HistoryItem';

type Props = {
  records: HistoryRecord[];
  date: string;
};

export const HistoryBlock: FC<Props> = ({ date, records }) => (
  <Box mb={3}>
    <Paper elevation={2}>
      <Box p={1}>
        <Typography variant="subtitle2">{date}</Typography>
      </Box>
      <Box>
        {records.map((record, index) => (
          <HistoryItem
            // eslint-disable-next-line
            key={index}
            {...record}
            lastItem={index === records.length - 1}
          />
        ))}
      </Box>
    </Paper>
  </Box>
);
