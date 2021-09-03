// import produce from 'immer'
import { gridContainerReducer, gridContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('GridContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(gridContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type GET_SEARCH_TUNES is dispatched', () => {
    const searchTerm = 'Jackson';
    const expectedResult = { ...state, searchTerm };
    expect(
      gridContainerReducer(state, {
        type: gridContainerTypes.GET_SEARCH_TUNES,
        searchTerm
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the gridData gets updated with the payload when SUCCESS_GET_SEARCH_TUNES is dispatched', () => {
    const data = { music: 'ABC', music2: 'BCA' };
    const expectedResult = { ...state, gridData: data };
    expect(
      gridContainerReducer(state, {
        type: gridContainerTypes.SUCCESS_GET_SEARCH_TUNES,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data when FAILURE_GET_SEARCH_TUNES is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, searchesError: error };
    expect(
      gridContainerReducer(state, {
        type: gridContainerTypes.FAILURE_GET_SEARCH_TUNES,
        error
      })
    ).toEqual(expectedResult);
  });
});
