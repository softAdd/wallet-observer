import { UserModel, UserType } from './mongo-models';

export const createUser = (user: UserType) => {
  return UserModel.create(user);
}

export const findUserByName = (name: string) => {
  return UserModel.findOne({ name }).lean().exec();
}

export const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email }).lean().exec();
}

export const findUserByEmailOrName = (name: string, email: string) => {
  return UserModel.findOne({
    $or: [
      { name },
      { email }
    ]
  }).lean().exec();
}