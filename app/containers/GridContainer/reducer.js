/*
 *
 * GridContainer reducer
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

export const { Types: gridContainerTypes, Creators: gridContainerCreators } = createActions({
  getSearchTunes: ['searchTerm'],
  successGetSearchTunes: ['data'],
  failureGetSearchTunes: ['error'],
  clearGridData: {}
});

/* eslint-disable default-case, no-param-reassign */
export const gridContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case gridContainerTypes.GET_SEARCH_TUNES:
        draft.searchTerm = action.searchTerm;
        break;
      case gridContainerTypes.SUCCESS_GET_SEARCH_TUNES:
        draft.gridData = action.data;
        break;
      case gridContainerTypes.FAILURE_GET_SEARCH_TUNES:
        draft.searchesError = get(action.error, 'message', 'something_went_wrong');
        break;
      case gridContainerTypes.CLEAR_GRID_DATA:
        draft.gridData = {};
        break;
      default:
        return draft;
    }
  });

export default gridContainerReducer;
