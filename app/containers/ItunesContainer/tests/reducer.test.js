// import produce from 'immer'
import { itunesContainerReducer, itunesContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ItunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should the return the required state when an action of type SEARCH_ITUNES is dispatched along', () => {
    const expectedResult = { ...state, searchTerm: 'Michael Jackson' };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SEARCH_ITUNES,
        searchTerm: 'Michael Jackson'
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that when SEARCH_ITUNES is success and SUCESS_SEARCH_ITUNES is dispatched, it clears the searchesError to "null" and then returns data to update gridData  ', () => {
    const data = { songName: 'Billie Jean', songArtist: 'Michael Jackson' };
    const expectedResult = { ...state, searchesError: null, gridData: data };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_SEARCH_ITUNES,
        data: data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that when FAILURE_SEARCH_ITUNES is dispatched, the gridData should be erased and then the searchesError is updated with error message', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, searchesError: error, gridData: [] };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_SEARCH_ITUNES,
        error
      })
    ).toEqual(expectedResult);
  });
});
