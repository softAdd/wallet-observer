import React, { useState, FC } from 'react';
import {
  Box,
  TextField,
  Button,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { postCategoryFx } from 'common/models/categories/store';
import { FieldWrapper } from 'common/components/FieldWrapper';

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      marginBottom: 0,
      marginTop: 0,
      width: 250,
    },
  })
);

export const CategoriesForm: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [category, setCategory] = useState<string>('');

  const addCategory = async () => {
    setCategory('');
    postCategoryFx(category);
  };

  return (
    <Box display="flex" flexWrap="wrap">
      <FieldWrapper>
        <TextField
          className={classes.input}
          label={t('Category name')}
          variant="outlined"
          margin="dense"
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Button variant="contained" color="primary" onClick={addCategory}>
          {t('Add')}
        </Button>
      </FieldWrapper>
    </Box>
  );
};
