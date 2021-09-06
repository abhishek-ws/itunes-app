import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';
/**
 * Direct selector to the itunesContainer state domain
 */

export const selectItunesContainerDomain = (state) => state.itunesContainer || initialState;

export const selectItunesContainer = () => createSelector(selectItunesContainerDomain, (substate) => substate);

export const selectGridData = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'gridData', null));

export const selectSearchTerm = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'searchTerm', null));

export const selectSearchError = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'searchError', null));
