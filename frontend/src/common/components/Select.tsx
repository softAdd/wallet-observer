import React, { FC } from 'react';
import { Select as MaterialSelect, SelectProps } from '@material-ui/core';

export const Select: FC<SelectProps> = ({ children, ...props }) => (
  <MaterialSelect
    style={{ width: 250 }}
    variant="outlined"
    margin="dense"
    {...props}
  >
    {children}
  </MaterialSelect>
);
