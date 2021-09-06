/*
 *
 * ItunesContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = {
  searchTerm: null,
  gridData: {},
  searchesError: null
};

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  searchItunes: ['searchTerm'],
  successSearchItunes: ['data'],
  failureSearchItunes: ['error'],
  clearGridData: {}
});

/* eslint-disable default-case, no-param-reassign */
export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesContainerTypes.SEARCH_ITUNES:
        draft.searchTerm = action.searchTerm;
        break;
      case itunesContainerTypes.SUCCESS_SEARCH_ITUNES:
        draft.searchesError = null;
        draft.gridData = action.data;
        break;
      case itunesContainerTypes.FAILURE_SEARCH_ITUNES:
        draft.gridData = {};
        draft.searchTerm = null;
        draft.searchesError = get(action.error, 'messages', 'something_went_wrong');
        break;
      case itunesContainerTypes.CLEAR_GRID_DATA:
        draft.searchTerm = null;
        draft.gridData = {};
        break;
    }
  });

export default itunesContainerReducer;
