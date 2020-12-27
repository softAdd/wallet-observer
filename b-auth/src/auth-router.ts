import { json, Router, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { compare, hash, genSaltSync } from 'bcryptjs';
import { UserType } from './mongo-models';
import { findUserByName, createUser, findUserByEmailOrName } from './users-queries';
import { createJwtUser, findJwtUserByRefreshToken, removeJwtUserByRefreshToken } from './jwt-users-queries';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt-very-secret-key';
const JWT_EXPIRE_TIME = 60; // seconds

const authRouter = Router();
authRouter.use(json());

const issueTokenPair = (name: string) => {
  const refreshToken = uuid();
  return {
    token: jwt.sign({ name }, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME }),
    refreshToken,
  }
}

const issueJwtUser = async (name: string, res: Response) => {
  try {
    const tokenPair = issueTokenPair(name);
    const jwtUser = { name, ...tokenPair };
    await createJwtUser(jwtUser);
    res.send(jwtUser);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

authRouter.post('/login', async (req, res) => {
  const { name, password } = req.body as { name: string; password: string; };
  const user = await findUserByName(name);

  if (user && await compare(password, user.password)) {
    await issueJwtUser(name, res);
  } else {
    res.sendStatus(403);
  }
});

authRouter.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body as { refreshToken: string; };
    await removeJwtUserByRefreshToken(refreshToken);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

authRouter.post('/register', async (req, res) => {
  const { ...user } = req.body as UserType;
  const { name, password, email } = user;
  const userInDb = await findUserByEmailOrName(name, email);

  if (!userInDb) {
    try {
      const hashedPassword = await hash(password, genSaltSync(10));
      await createUser({ ...user, password: hashedPassword });
      await issueJwtUser(name, res);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

authRouter.post('/whoami', async (req, res) => {
  const { refreshToken } = req.body as { refreshToken: string };
  const user = await findJwtUserByRefreshToken(refreshToken);

  if (user) {
    try {
      await removeJwtUserByRefreshToken(refreshToken);
      await issueJwtUser(user.name, res);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(404);
  }
});

export default authRouter;
