import { $filters, addFilter, removeFilter, setFilters } from './index';

$filters.on(addFilter, (storeFilters, nextFilter) => {
  const updatedFilters = storeFilters.slice();
  const filterIndex = storeFilters.findIndex(
    (filter) => filter.type === nextFilter.type
  );

  if (filterIndex === -1) {
    return [...updatedFilters, nextFilter];
  }

  updatedFilters[filterIndex] = nextFilter;
  return updatedFilters;
});

$filters.on(removeFilter, (storeFilters, filterType) =>
  storeFilters.slice().filter(({ type }) => type !== filterType)
);

$filters.on(setFilters, (_, filters) => filters);
