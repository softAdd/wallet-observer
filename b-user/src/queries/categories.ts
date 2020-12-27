import { CategoriesModel, CategoryModel, CategoryType } from '../mongo-models';

export const createCategoriesList = async (username: string) => {
  const defaultCategory = await CategoryModel.create({ name: 'default' });
  const categoriesList = await CategoriesModel.create({ username, categories: [defaultCategory] });
  return categoriesList;
}

export const findCategories = (username: string) => {
  return CategoriesModel.findOne({ username }).lean().exec();
}

export const addCategory = (username: string, name: CategoryType['name']) => {
  return CategoriesModel.updateOne({ username }, { $push: { categories: { name } } });
}

export const removeCategory = (username: string, _id: string) => {
  return CategoriesModel.updateOne({ username }, { $pull: { categories: { _id } } });
}
