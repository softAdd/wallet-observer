import express from 'express';
import cors from 'cors';
import authRouter from './src/auth-router';

const APP_PORT = process.env.APP_PORT || '80';

const app = express();
app.use(cors());
app.use(authRouter);

app.listen(APP_PORT, () => console.log(`Auth backend listen on ${APP_PORT}`));
