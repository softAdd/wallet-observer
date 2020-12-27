import express from 'express';
import cors from 'cors';
import walletRouter from './src/routes/wallet';
import categoriesRouter from './src/routes/categories';

const APP_PORT = process.env.APP_PORT || '80';

const app = express();
app.use(cors());
app.use(walletRouter);
app.use(categoriesRouter);

app.listen(APP_PORT, () => console.log(`User backend listen on ${APP_PORT}`));
