import { HistoryModel, HistoryType } from '../mongo-models';

export const createUserHistory = (username: string) => {
  return HistoryModel.create({ username, blocks: [] });
}

export const findUserHistory = (username: string) => {
  return HistoryModel.findOne({ username }).select('-_id -__v').lean().exec() as Promise<HistoryType | null>;
}

export const patchUserHistory = (username: string, settingsToPatch: Partial<HistoryType>) => {
  return HistoryModel.updateOne({ username }, settingsToPatch);
}
