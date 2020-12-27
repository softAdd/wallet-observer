import mongoose, { Document as MongooseDoc } from 'mongoose';
import { walletSchema, IWallet } from './schemas/Wallet';
import { IAuthorizedJwt, authorizedJwtSchema } from './schemas/AuthorizedJwt';
import { IHistory, historySchema } from './schemas/History';
import { ICategoriesList, ICategory, categoriesListSchema, categorySchema } from './schemas/Categories';

const MONGO_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';

const DB_WALLET = process.env.DB_BALANCE || 'wallet';
const DB_USERS = process.env.DB_USERS || 'users';
const DB_HISTORY = process.env.DB_HISTORY || 'history';
const DB_CATEGORIES = process.env.DB_CATEGORIES || 'categories';

const WALLET_DB_URL = `${MONGO_URL}/${DB_WALLET}`;
const USERS_DB_URL = `${MONGO_URL}/${DB_USERS}`;
const HISTORY_DB_URL = `${MONGO_URL}/${DB_HISTORY}`;
const CATEGORIES_DB_URL = `${MONGO_URL}/${DB_CATEGORIES}`;

const CONNECTION_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const walletMongoConnection = mongoose.createConnection(WALLET_DB_URL, CONNECTION_OPTIONS);
const jwtMongoConnection = mongoose.createConnection(USERS_DB_URL, CONNECTION_OPTIONS);
const historyMongoConnection = mongoose.createConnection(HISTORY_DB_URL, CONNECTION_OPTIONS);
const categoriesMongoConnection = mongoose.createConnection(CATEGORIES_DB_URL, CONNECTION_OPTIONS);

type GetEntity<SchemaInterface = any> = Omit<SchemaInterface, keyof MongooseDoc>;

export type AuthorizedJwtType = GetEntity<IAuthorizedJwt>;
export const AuthorizedJwtModel = jwtMongoConnection.model<IAuthorizedJwt>('AuthorizedJwt', authorizedJwtSchema);

export type WalletType = GetEntity<IWallet>;
export const WalletModel = walletMongoConnection.model<IWallet>('Wallet', walletSchema);

export type HistoryType = GetEntity<IHistory>;
export const HistoryModel = historyMongoConnection.model<IHistory>('History', historySchema);

export type CategoriesType = GetEntity<ICategoriesList>;
export const CategoriesModel = categoriesMongoConnection.model<ICategoriesList>('Categories', categoriesListSchema);

export type CategoryType = GetEntity<ICategory>;
export const CategoryModel = categoriesMongoConnection.model<ICategory>('Category', categorySchema);
