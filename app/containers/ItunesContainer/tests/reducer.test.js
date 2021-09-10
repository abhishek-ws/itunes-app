// import produce from 'immer'
import { itunesContainerReducer, itunesContainerTypes, initialState } from '../reducer';
import { setIntl, translate } from '@app/components/IntlGlobalProvider/';
import getIntl from '@utils/createIntl';

/* eslint-disable default-case, no-param-reassign */
describe('ItunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  beforeAll(() => {
    setIntl(getIntl());
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
    const expectedResult = { ...state, searchError: null, gridData: data };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_SEARCH_ITUNES,
        data: data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that when FAILURE_SEARCH_ITUNES is dispatched, the gridData should be erased and then the searchesError is updated with error message', () => {
    const error = translate('something_went_wrong');
    const expectedResult = { ...state, searchError: error, gridData: {} };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_SEARCH_ITUNES,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that CLEAR_GRID_DATA dispatch clears the gridData', () => {
    const expectedResult = { ...state, gridData: {} };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.CLEAR_GRID_DATA
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that SEARCH_TRACK updates the value of trackId', () => {
    const trackId = 1234;
    const expectedResult = { ...state, trackId };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SEARCH_TRACK,
        trackId
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that SUCCESS_SEARCH_TRACK updates states accordingly', () => {
    const trackSearchError = null;
    const trackId = 1234;
    const data = { resultsCount: 1, results: [{ songName: 'Song' }] };
    const trackDetails = { songName: 'Song' };
    const mockedState = { ...state, trackId };
    const songsCache = { 1234: data };
    const expectedResult = {
      ...state,
      trackDetails,
      trackSearchError,
      trackId,
      songsCache
    };

    expect(
      itunesContainerReducer(mockedState, {
        type: itunesContainerTypes.SUCCESS_SEARCH_TRACK,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should dispatch FAILURE_SEARCH_TRACK and update states accordingly', () => {
    const trackDetails = {};
    const error = translate('something_went_wrong');
    const expectedResult = { ...state, trackSearchError: error, trackDetails };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_SEARCH_TRACK,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that CLEAR_TRACK_DETAILS clears the trackDetails state', () => {
    const expectedResult = { ...state, trackDetails: {} };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.CLEAR_TRACK_DETAILS
      })
    ).toEqual(expectedResult);
  });
});
