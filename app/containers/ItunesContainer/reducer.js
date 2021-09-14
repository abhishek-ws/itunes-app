/*
 *
 * ItunesContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  searchTerm: null,
  trackId: null,
  gridData: {},
  trackDetails: {},
  songsCache: {},
  searchError: null,
  trackSearchError: null
};

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  searchItunes: ['searchTerm'],
  successSearchItunes: ['data'],
  failureSearchItunes: ['error'],
  searchTrack: ['trackId'],
  successSearchTrack: ['response'],
  failureSearchTrack: ['error'],
  trackDetails: {},
  clearGridData: {},
  clearTrackDetails: {}
});

/* eslint-disable default-case, no-param-reassign */
export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesContainerTypes.SEARCH_ITUNES:
        draft.searchTerm = action.searchTerm;
        break;
      case itunesContainerTypes.SUCCESS_SEARCH_ITUNES:
        draft.searchError = null;
        draft.gridData = action.data;
        break;
      case itunesContainerTypes.FAILURE_SEARCH_ITUNES:
        draft.gridData = {};
        draft.searchTerm = null;
        draft.searchError = action.error;
        break;
      case itunesContainerTypes.CLEAR_GRID_DATA:
        draft.searchTerm = null;
        draft.gridData = {};
        break;
      case itunesContainerTypes.SEARCH_TRACK:
        draft.trackSearchError = null;
        draft.trackDetails = {};
        draft.trackId = action.trackId;
        break;
      case itunesContainerTypes.SUCCESS_SEARCH_TRACK:
        draft.trackDetails = {};
        draft.trackSearchError = null;
        draft.songsCache[draft.trackId] = action.response.data;
        draft.trackDetails = action.response.trackDetails;
        break;
      case itunesContainerTypes.FAILURE_SEARCH_TRACK:
        draft.trackDetails = {};
        draft.trackSearchError = action.error;
        break;
      case itunesContainerTypes.CLEAR_TRACK_DETAILS:
        draft.trackDetails = {};
        break;
    }
  });

export default itunesContainerReducer;
