import { json, Router, Response } from 'express';
import { authenticateToken, getUserByToken } from './utils';
import { findCategories, createCategoriesList, removeCategory, addCategory } from '../queries/categories';
import { CategoryType } from '../mongo-models';

const categoriesRouter = Router();

categoriesRouter.use(json());
categoriesRouter.use(authenticateToken);

const sendCategories = async (username: string, res: Response) => {
  const categoriesList = await findCategories(username);

  if (!categoriesList) {
    const defaultUserCategories = await createCategoriesList(username);
    res.send(defaultUserCategories);
  } else {
    res.send(categoriesList);
  }
}

categoriesRouter.get('/categories', async (req, res) => {
  try {
    const user = await getUserByToken(req);
    user ? sendCategories(user.name, res) : res.sendStatus(404);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

categoriesRouter.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByToken(req);

    if (user) {
      await removeCategory(user.name, id);
      res.sendStatus(200);
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

categoriesRouter.post('/categories', async (req, res) => {
  try {
    const { name } = req.body as CategoryType;
    const user = await getUserByToken(req);
    
    if (user) {
      await addCategory(user.name, name);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


export default categoriesRouter;
