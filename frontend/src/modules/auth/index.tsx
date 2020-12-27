import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core';
import { useStore } from 'effector-react';
import {
  $user,
  setLoginError,
  setRegisterError,
} from 'common/models/auth/store';
import { Login } from './Login';
import { Register } from './Register';

const useStyles = makeStyles(() =>
  createStyles({
    authRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
  })
);

export const AuthModule: FC = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const classes = useStyles();
  const authUser = useStore($user);

  const updateFormType = (isRegister: boolean) => {
    setIsRegisterForm(isRegister);
    setLoginError(false);
    setRegisterError(false);
  };

  if (authUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.authRoot}>
      {isRegisterForm ? (
        <Register setLoginForm={() => updateFormType(false)} />
      ) : (
        <Login setRegisterForm={() => updateFormType(true)} />
      )}
    </div>
  );
};
