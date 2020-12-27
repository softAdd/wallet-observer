import React, { FC, useState } from 'react';
import {
  Paper,
  Container,
  CssBaseline,
  Avatar,
  Theme,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useStore } from 'effector-react';
import {
  $registerError,
  requestRegisterFx,
  setRegisterError,
} from 'common/models/auth/store';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginPaper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      padding: theme.spacing(2),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    buttonSubmit: {
      margin: theme.spacing(3, 0, 2),
    },
    loginError: {
      padding: theme.spacing(1, 0),
      color: theme.palette.error.main,
    },
    createAccountLink: {
      color: theme.palette.primary.main,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })
);

export const Register: FC<{ setLoginForm: () => void }> = ({
  setLoginForm,
}) => {
  const classes = useStyles();
  const hasError = useStore($registerError);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const submitAction = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    requestRegisterFx({
      name: login,
      password,
      email,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={2} className={classes.loginPaper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form className={classes.form} onSubmit={submitAction}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label={t('Email')}
            name="email-finup"
            autoComplete="email-finup"
            autoFocus
            onChangeCapture={() => setRegisterError(false)}
            error={hasError}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="login"
            label={t('Login')}
            name="login-finup"
            autoComplete="login-finup"
            autoFocus
            onChangeCapture={() => setRegisterError(false)}
            error={hasError}
            value={login}
            onChange={({ target }) => setLogin(target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label={t('Password')}
            type="password"
            id="password"
            autoComplete="current-password"
            onChangeCapture={() => setRegisterError(false)}
            error={hasError}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          {hasError && (
            <Typography className={classes.loginError}>
              {t('Failed to login')}
            </Typography>
          )}
          <Button
            className={classes.buttonSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {t('Sign Up')}
          </Button>
          <Typography
            variant="body2"
            className={classes.createAccountLink}
            onClick={setLoginForm}
          >
            {t('Already have an account? Login')}
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};
