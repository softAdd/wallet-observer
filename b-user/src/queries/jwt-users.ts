import { AuthorizedJwtModel, AuthorizedJwtType } from '../mongo-models';

export const findJwtUserByToken = (token: string) => {
  return AuthorizedJwtModel.findOne({ token }).select('-_id -__v').lean().exec() as Promise<AuthorizedJwtType | null>;
}
