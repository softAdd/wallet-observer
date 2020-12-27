import React, { FC } from 'react';
import { TextField as MaterialTextField, TextFieldProps } from '@material-ui/core';

export const TextField: FC<TextFieldProps> = (props) => (
  <MaterialTextField
    style={{ width: 250 }}
    variant="outlined"
    margin="dense"
    {...props}
  />
);