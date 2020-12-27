import { createEffect, createEvent, createStore } from 'effector';
import { CategoriesList, Category } from 'common/types/categories';

export const $categories = createStore<CategoriesList | null>(null);
export const setCategories = createEvent<CategoriesList | null>();

export const getCategoriesFx = createEffect<void, CategoriesList>();
export const deleteCategoryFx = createEffect<Category['_id'], void>();
export const postCategoryFx = createEffect<Category['name'], void>();
