import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the gridContainer state domain
 */

const selectGridContainerDomain = (state) => state.gridContainer || initialState;

const selectGridContainer = () => createSelector(selectGridContainerDomain, (substate) => substate);

export const selectSearchTerm = () =>
  createSelector(selectGridContainerDomain, (substate) => get(substate, 'searchTerm', null));

export const selectGridData = () =>
  createSelector(selectGridContainerDomain, (substate) => get(substate, 'gridData', null));

export const selectSearchesError = () =>
  createSelector(selectGridContainerDomain, (substate) => get(substate, 'searchesError', null));

export default selectGridContainer;
export { selectGridContainerDomain };
