import { Schema, Document } from 'mongoose';

export type WalletAction = 'spend' | 'earn' | 'set_manually';

export type HistoryRecord = {
  type: WalletAction;
  amount: number;
  label: string;
}

const historyRecordSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

export type HistoryBlockType = {
  date: string;
  records: HistoryRecord[];
}

const historyBlockSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  records: {
    type: [historyRecordSchema],
    required: true,
  },
});

export interface IHistory extends Document {
  username: string;
  blocks: HistoryBlockType[];
}

export const historySchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  blocks: {
    type: [historyBlockSchema],
    required: true,
  },
});