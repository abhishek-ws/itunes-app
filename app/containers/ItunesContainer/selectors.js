import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';
/**
 * Direct selector to the itunesContainer state domain
 */

export const selectItunesContainerDomain = (state) => state.itunesContainer || initialState;

function getState(state) {
  return createSelector(selectItunesContainerDomain, (substate) => get(substate, state));
}

export const selectItunesContainer = () => createSelector(selectItunesContainerDomain, (substate) => substate);

export const selectGridData = () => getState('gridData');

export const selectSearchTerm = () => getState('searchTerm');

export const selectSearchError = () => getState('searchError');

export const selectTrackDetails = () => getState('trackDetails');

export const selectSongsCache = () => getState('songsCache');

export const selectTrackId = () => getState('trackId');

export const selectTrackSearchError = () => getState('trackSearchError');
