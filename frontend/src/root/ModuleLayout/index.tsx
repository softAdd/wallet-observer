import React, { FC, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Content } from './Content';
import { SideBar } from './SideBar';
import { TopBar } from './TopBar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
  })
);

export const ModuleLayout: FC = ({ children }) => {
  const classes = useStyles();
  const [isNavOpen, setNavOpen] = useState(false);
  // import { useMediaQuery } from '@material-ui/core';
  // Bootstrap extra small
  // const isMobile = useMediaQuery('(max-width:576px)');
  // Turn off for a while
  const isMobile = false;

  return (
    <div className={classes.root}>
      <CssBaseline />
      {!isMobile && <TopBar open={isNavOpen} setOpen={setNavOpen} />}
      {!isMobile && <SideBar open={isNavOpen} setOpen={setNavOpen} />}
      <Content isMobile={isMobile}>{children}</Content>
    </div>
  );
};
