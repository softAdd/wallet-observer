import {
  postLogin,
  postLogout,
  postRegister,
  postWhoami,
} from 'common/api/auth';
import { User } from 'common/types/auth';
import {
  $user,
  requestLoginFx,
  requestLogoutFx,
  requestRegisterFx,
  requestWhoamiFx,
  setLoginError,
  setRegisterError,
  setUser,
} from './store';

function setTokens(user: User) {
  localStorage.setItem('token', user.token);
  localStorage.setItem('refreshToken', user.refreshToken);
}

function removeTokens() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
}

requestLoginFx.use(async (user) => {
  const { data } = await postLogin(user);
  setTokens(data);
  return data;
});

requestRegisterFx.use(async (user) => {
  const { data } = await postRegister(user);
  setTokens(data);
  return data;
});

requestWhoamiFx.use(async (refreshToken) => {
  const { data } = await postWhoami(refreshToken);
  removeTokens();
  setTokens(data);
  return data;
});

requestLogoutFx.use(async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    await postLogout(refreshToken);
    removeTokens();
    setUser(null);
  }
});

$user.on(setUser, (_, user) => user);
$user.on(requestLoginFx.doneData, (_, user) => user);
$user.on(requestRegisterFx.doneData, (_, user) => user);
$user.on(requestWhoamiFx.doneData, (_, user) => user);

requestLoginFx.fail.watch(() => setLoginError(true));
requestLoginFx.done.watch(() => setLoginError(false));

requestRegisterFx.fail.watch(() => setRegisterError(true));
requestRegisterFx.done.watch(() => setRegisterError(false));
