/**
 * Test itunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, call, takeLatest } from 'redux-saga/effects';
import itunesContainerSaga, { requestSearchItunes } from '../saga';
import { apiResponseGenerator } from '@utils/testUtils';
import { getSongs } from '@services/songsApi';
import { itunesContainerTypes } from '../reducer';

describe('ItunesContainer saga tests', () => {
  const generator = itunesContainerSaga();
  const searchTerm = 'Billie Jean';
  let requestSongsGenerator = requestSearchItunes({ searchTerm });

  it('should start task to watch for SEARCH_ITUNES action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.SEARCH_ITUNES, requestSearchItunes));
  });

  it('should ensure that action FAILURE_SEARCH_ITUNES is dispatched when the api call falls', () => {
    const res = requestSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, searchTerm));

    const errorRes = { originalError: { message: 'Some error occurred ' } };

    expect(requestSongsGenerator.next(apiResponseGenerator(false, errorRes)).value).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_SEARCH_ITUNES,
        error: errorRes
      })
    );
  });

  it('should ensure that action SUCCESS_SEARCH_ITUNES is dispatched when the api call is successful', () => {
    requestSongsGenerator = requestSearchItunes({ searchTerm });
    const res = requestSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, searchTerm));

    const successResponse = {
      resultCount: 0,
      results: [{ songName: 'Billie Jean', songArtist: 'Michael Jackson' }]
    };

    expect(requestSongsGenerator.next(apiResponseGenerator(true, successResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_SEARCH_ITUNES,
        data: successResponse
      })
    );
  });
});
