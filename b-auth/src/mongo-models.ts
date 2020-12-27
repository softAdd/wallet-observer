import mongoose, { Document as MongooseDoc } from 'mongoose';
import { authorizedJwtSchema, IAuthorizedJwt } from './schemas/AuthorizedJwt';
import { userSchema, IUser } from './schemas/User';

const MONGO_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';
const DB_USERS = process.env.DB_USERS || 'users';
const DB_JWT = process.env.DB_JWT || 'jwt-connections';
const USERS_DB_URL = `${MONGO_URL}/${DB_USERS}`;
const JWT_DB_URL = `${MONGO_URL}/${DB_JWT}`;

const jwtMongoConnection = mongoose.createConnection(USERS_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const usersMongoConnection = mongoose.createConnection(JWT_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

type GetEntity<SchemaInterface = any> = Omit<SchemaInterface, keyof MongooseDoc>;

export type AuthorizedJwtType = GetEntity<IAuthorizedJwt>;
export const AuthorizedJwtModel = jwtMongoConnection.model<IAuthorizedJwt>('AuthorizedJwt', authorizedJwtSchema);

export type UserType = GetEntity<IUser>;
export const UserModel = usersMongoConnection.model<IUser>('User', userSchema);