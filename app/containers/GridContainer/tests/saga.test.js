/**
 * Test gridContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import gridContainerSaga, { defaultFunction } from '../saga';
import { gridContainerTypes } from '../reducer';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSearches } from '@app/services/searchApi';
import { apiResponseGenerator } from '@utils/testUtils';

describe('GridContainer saga tests', () => {
  const generator = gridContainerSaga();
  const searchTerm = 'Abhishek';
  let getSearchTunesGenerator = defaultFunction({ searchTerm });
  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(gridContainerTypes.GET_SEARCH_TUNES, defaultFunction));
  });

  it('should ensure that the action FAILURE_GET_SEARCH_TUNES gets dispatched when the api call fails', () => {
    const res = getSearchTunesGenerator.next().value;
    expect(res).toEqual(call(getSearches, searchTerm));
    const errorRes = {
      errorMessage: 'There was an error occurred while fetching the songs'
    };
    expect(getSearchTunesGenerator.next(apiResponseGenerator(false, errorRes)).value).toEqual(
      put({
        type: gridContainerTypes.FAILURE_GET_SEARCH_TUNES,
        error: errorRes
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_SEARCH_TUNES gets dispatched when the api call is success', () => {
    getSearchTunesGenerator = defaultFunction({ searchTerm });
    const res = getSearchTunesGenerator.next().value;
    expect(res).toEqual(call(getSearches, searchTerm));
    const successRes = {
      resultCount: 1,
      results: [{ musicName: searchTerm }]
    };
    expect(getSearchTunesGenerator.next(apiResponseGenerator(true, successRes)).value).toEqual(
      put({
        type: gridContainerTypes.SUCCESS_GET_SEARCH_TUNES,
        data: successRes
      })
    );
  });
});
