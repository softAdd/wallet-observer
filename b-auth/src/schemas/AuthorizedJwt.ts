import { Schema, Document } from 'mongoose';

export interface IAuthorizedJwt extends Document {
  name: string;
  token: string;
  refreshToken: string;
}

export const authorizedJwtSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});
