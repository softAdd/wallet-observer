import { AuthorizedJwtModel, AuthorizedJwtType } from './mongo-models';

export const createJwtUser = (user: AuthorizedJwtType) => {
  return AuthorizedJwtModel.create(user);
}

export const removeJwtUserByRefreshToken = (refreshToken: string) => {
  return AuthorizedJwtModel.deleteOne({ refreshToken }).exec();
}

export const findJwtUserByName = (name: string) => {
  return AuthorizedJwtModel.findOne({ name }).lean().exec();
}

export const findJwtUserByRefreshToken = (refreshToken: string) => {
  return AuthorizedJwtModel.findOne({ refreshToken }).lean().exec();
}
