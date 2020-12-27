export type Category = {
  _id: string;
  name: string;
};

export type CategoriesList = {
  _id: string;
  username: string;
  categories: Category[];
};
