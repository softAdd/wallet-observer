import React, { useState, FC } from 'react';
import {
  Box,
  TextField,
  Select,
  Button,
  MenuItem,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { WalletAction } from 'common/types/wallet';
import { postWalletOperationFx } from 'common/models/wallet/store';
import { useTranslation } from 'react-i18next';
import { HISTORY_LABEL } from 'common/constants';
import { useStore } from 'effector-react';
import { $categories } from 'common/models/categories/store';
import { CategoriesList } from 'common/types/categories';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formRoot: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: theme.spacing(3),
      borderBottom: '1px solid #e3e3e3',
    },
    input: {
      marginBottom: 0,
      marginTop: 0,
      width: 250,
    },
    typeSelect: {
      width: 250,
    },
    fieldWrapper: {
      padding: theme.spacing(1),
    },
  })
);

const RECORD_TYPES: WalletAction[] = ['earn', 'spend', 'set_manually'];

export const OperationForm: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { categories } = useStore($categories) as CategoriesList;
  const [amount, setAmount] = useState<string>('');
  const [label, setLabel] = useState<string>(categories[0].name as string);
  const [type, setType] = useState(RECORD_TYPES[0]);

  const submitMoneyUpdate = () => {
    if (amount !== '') {
      postWalletOperationFx({
        type,
        label,
        amount: Number(amount),
      });
      setAmount('');
    }
  };

  return (
    <Box className={classes.formRoot}>
      <Box className={classes.fieldWrapper}>
        <TextField
          className={classes.input}
          placeholder="0"
          type="number"
          variant="outlined"
          margin="dense"
          value={amount}
          onChange={({ target }) => setAmount(target.value)}
        />
      </Box>
      <Box className={classes.fieldWrapper}>
        <Select
          className={classes.typeSelect}
          variant="outlined"
          margin="dense"
          value={label}
          onChange={({ target }) => setLabel(target.value as string)}
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box className={classes.fieldWrapper}>
        <Select
          className={classes.typeSelect}
          variant="outlined"
          margin="dense"
          value={type}
          onChange={({ target }) => setType(target.value as WalletAction)}
        >
          {RECORD_TYPES.map((recordType) => (
            <MenuItem key={recordType} value={recordType}>
              {HISTORY_LABEL(recordType, t)}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box className={classes.fieldWrapper}>
        <Button variant="contained" color="primary" onClick={submitMoneyUpdate}>
          {t('Confirm')}
        </Button>
      </Box>
    </Box>
  );
};
