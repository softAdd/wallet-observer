import axios from 'common/axios';
import { CategoriesList, Category } from 'common/types/categories';

export const getCategories = () => axios.get<CategoriesList>('/api/categories');

export const postCategory = (name: Category['name']) =>
  axios.post('/api/categories', { name });

export const deleteCategory = (id: Category['_id']) =>
  axios.delete(`/api/categories/${id}`);
