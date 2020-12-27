import { FILTERS } from './consts';

type FilterType = typeof FILTERS[number];

export type Filter = {
  type: FilterType;
  value: string;
};
