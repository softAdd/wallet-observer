import React, { FC, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { $categories, getCategoriesFx } from 'common/models/categories/store';
import { useStore } from 'effector-react';
import { CategoriesForm } from './CategoriesForm';
import { CategoriesTable } from './CategoriesTable';

const Categories: FC = () => {
  const categoriesList = useStore($categories);

  useEffect(() => {
    getCategoriesFx();
  }, []);

  if (!categoriesList) {
    return null;
  }

  return (
    <Box p={3} display="flex" flexDirection="column">
      <CategoriesForm />
      <CategoriesTable />
    </Box>
  );
};

export default Categories;
