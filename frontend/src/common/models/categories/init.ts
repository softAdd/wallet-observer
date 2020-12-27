import {
  deleteCategory,
  getCategories,
  postCategory,
} from 'common/api/categories';
import {
  $categories,
  deleteCategoryFx,
  getCategoriesFx,
  postCategoryFx,
  setCategories,
} from './store';

getCategoriesFx.use(async () => {
  const { data } = await getCategories();
  setCategories(data);
  return data;
});

deleteCategoryFx.use(async (id) => {
  await deleteCategory(id);
  getCategoriesFx();
});

postCategoryFx.use(async (name) => {
  await postCategory(name);
  getCategoriesFx();
});

$categories.on(getCategoriesFx.doneData, (_, categories) => categories);
