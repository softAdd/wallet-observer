import React, { FC } from 'react';
import { Box, BoxProps } from '@material-ui/core';

export const FieldWrapper: FC<BoxProps> = ({ children, ...props }) => (
  <Box p={1} {...props}>
    {children}
  </Box>
);
