import { Schema, Document } from 'mongoose';

export interface IWallet extends Document {
  username: string;
  amount: number;
  currency: 'USD' | 'RUB';
}

export const walletSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});