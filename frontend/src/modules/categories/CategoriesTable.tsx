import React, { FC } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import BackspaceTwoToneIcon from '@material-ui/icons/BackspaceTwoTone';
import { useTranslation } from 'react-i18next';
import { $categories, deleteCategoryFx } from 'common/models/categories/store';
import { useStore } from 'effector-react';
import { WarningPlate } from 'common/components/WarningPlate';
import { CategoriesList } from 'common/types/categories';

export const CategoriesTable: FC = () => {
  const { t } = useTranslation();
  const { categories } = useStore($categories) as CategoriesList;

  if (categories.length === 0) {
    return <WarningPlate>{t('Add some categories')}</WarningPlate>;
  }

  return (
    <Box mt={2} display="flex">
      <Box p={1} width="100%" maxWidth={500}>
        <TableContainer component={Paper} elevation={2}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  {t('Name')}
                </TableCell>
                <TableCell>
                  {t('Actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell style={{ width: '100%' }}>
                    {category.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => deleteCategoryFx(category._id)}>
                      <BackspaceTwoToneIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};