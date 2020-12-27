import { createStore, createEvent } from 'effector';
import { Filter } from '../types';

export const $filters = createStore<Filter[]>([]);
export const setFilters = createEvent<Filter[]>();
export const addFilter = createEvent<Filter>();
export const removeFilter = createEvent<Filter['type']>();
