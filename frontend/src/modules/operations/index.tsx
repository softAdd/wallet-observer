import React, { FC, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { useStore } from 'effector-react';
import { $wallet, requestUserWalletFx } from 'common/models/wallet/store';
import { $categories, getCategoriesFx } from 'common/models/categories/store';
import { WarningPlate } from 'common/components/WarningPlate';
import { useTranslation } from 'react-i18next';
import { MoneyTitle } from './MoneyTitle';
import { OperationForm } from './OperationForm';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
    },
  })
);

const Operations: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const wallet = useStore($wallet);
  const categoriesList = useStore($categories);

  useEffect(() => {
    requestUserWalletFx();
    getCategoriesFx();
  }, []);

  if (!wallet || !categoriesList) {
    return null;
  }

  if (categoriesList.categories.length === 0) {
    return <WarningPlate>{t('Add some categories')}</WarningPlate>;
  }

  return (
    <div className={classes.root}>
      <MoneyTitle wallet={wallet} />
      <OperationForm />
    </div>
  );
};

export default Operations;
