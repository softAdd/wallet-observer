import React, { FC, useState } from 'react';
import { Paper, MenuItem, Typography } from '@material-ui/core';
import { FieldWrapper } from 'common/components/FieldWrapper';
import { $categories } from 'common/models/categories/store';
import { useStore } from 'effector-react';
import { CategoriesList } from 'common/types/categories';
import { Select } from 'common/components/Select';
import { useTranslation } from 'react-i18next';
import { addFilter, removeFilter } from './store';
import { Filter } from './types';

const setFilter = (type: Filter['type'], value: Filter['value'], emptyValue: string) => {
  if (value === emptyValue) {
    removeFilter(type);
  } else {
    addFilter({ type, value });
  }
};

export const Filters: FC = () => {
  const { t } = useTranslation();
  const emptyValue = t('no');
  const { categories } = useStore($categories) as CategoriesList;
  const [category, setCategory] = useState(emptyValue);

  const setCategoryFilter = (value: string) => {
    setFilter('category', value, emptyValue);
    setCategory(value);
  };

  return (
    <Paper elevation={2}>
      <FieldWrapper display="flex" flexDirection="column" py={2}>
        <Typography variant="caption">{t('Category')}</Typography>
        <Select
          value={category}
          onChange={({ target }) => setCategoryFilter(target.value as string)}
        >
          <MenuItem value={emptyValue}>{emptyValue}</MenuItem>
          {categories.map(({ _id, name }) => (
            <MenuItem key={_id} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FieldWrapper>
    </Paper>
  );
};