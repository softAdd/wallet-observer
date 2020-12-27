import React, { FC } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { LineChart, YAxis, XAxis, CartesianGrid, Line } from 'recharts';
import { HistoryBlockType, WalletAction } from 'common/types/wallet';
import { useStore } from 'effector-react';
import { $filters } from './store';

type LineChartData = {
  date: string;
  amount: number;
};

const filterHistoryRecords = (
  historyBlocks: HistoryBlockType[],
  recordType: WalletAction,
  category?: string
): LineChartData[] =>
  historyBlocks
    .map((historyItem) => ({
      date: historyItem.date,
      amount: historyItem.records
        .filter((record) => {
          const typeIsOk = record.type === recordType;
          const categoryIsOk = category ? record.label === category : true;
          return typeIsOk && categoryIsOk;
        })
        .reduce((amount, record) => {
          const summedAmount = amount + record.amount;
          return summedAmount;
        }, 0),
    }))
    .reverse();

type Props = {
  historyBlocks: HistoryBlockType[];
  recordType: WalletAction;
  lineStroke: string;
  title: string;
};

export const SimpleLineChart: FC<Props> = ({
  historyBlocks,
  recordType,
  lineStroke,
  title,
}) => {
  const filters = useStore($filters);
  const categoryFilter = filters.find((filter) => filter.type === 'category');

  const data = filterHistoryRecords(
    historyBlocks,
    recordType,
    categoryFilter?.value
  );

  return (
    <Paper elevation={2}>
      <Box p={1}>
        <Typography variant="subtitle2">{title}</Typography>
      </Box>
      <Box px={1} py={2}>
        <LineChart
          width={400}
          height={200}
          data={data}
        >
          <XAxis dataKey="date" />
          <YAxis dataKey="amount" />
          <CartesianGrid stroke="#eee" strokeDasharray="1 1" />
          <Line
            type="monotone"
            dataKey="amount"
            stroke={lineStroke}
            strokeWidth="1.5"
            animationDuration={400}
            dot={false}
          />
        </LineChart>
      </Box>
    </Paper>
  );
};
