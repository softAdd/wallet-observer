import { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
}

export const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

type CategoryItem = Partial<ICategory> & { name: string };

export interface ICategoriesList extends Document {
  username: string;
  categories: CategoryItem[];
}

export const categoriesListSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  categories: {
    type: [categorySchema],
    required: true,
  },
});