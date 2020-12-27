import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      backgroundColor: '#ffffff',
      overflowY: 'auto'
    },
  })
);

export const Content: FC<{ isMobile: boolean }> = ({ children, isMobile }) => {
  const classes = useStyles();

  return (
    <main className={classes.contentWrapper}>
      {!isMobile && <div className={classes.toolbar} />}
      <div className={classes.content}>{children}</div>
    </main>
  );
};
