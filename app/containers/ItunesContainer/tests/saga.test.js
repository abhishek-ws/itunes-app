/**
 * Test itunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, call, takeLatest } from 'redux-saga/effects';
import itunesContainerSaga, { requestSearchItunes, requestTrackDetails } from '../saga';
import { apiResponseGenerator } from '@utils/testUtils';
import { getSongs, getTrackDetails } from '@services/songsApi';
import { itunesContainerTypes } from '../reducer';
import { setIntl, translate } from '@app/components/IntlGlobalProvider/';
import getIntl from '@utils/createIntl';

/* eslint-disable default-case, no-unused-vars */
describe('ItunesContainer saga tests', () => {
  const generator = itunesContainerSaga();
  const searchTerm = 'Billie Jean';
  const trackId = 1234;
  let requestSongsGenerator = requestSearchItunes({ searchTerm });
  let requestTrackDetailsGenerator = requestTrackDetails({ trackId });

  beforeAll(() => {
    setIntl(getIntl());
  });

  it('should start task to watch for SEARCH_ITUNES action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.SEARCH_ITUNES, requestSearchItunes));
  });

  it('should ensure that action FAILURE_SEARCH_ITUNES is dispatched when the api call falls', () => {
    const res = requestSongsGenerator.next().value;
    expect(res).toEqual(call(getSongs, searchTerm));

    const errorRes = translate('something_went_wrong');

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

    const data = {
      resultCount: 0,
      results: [{ songName: 'Billie Jean', songArtist: 'Michael Jackson' }]
    };

    expect(requestSongsGenerator.next(apiResponseGenerator(true, data)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_SEARCH_ITUNES,
        data
      })
    );
  });

  it('should watch for SEARCH_TRACK action to be dispatched', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.SEARCH_TRACK, requestTrackDetails));
  });

  it('should ensure that action SUCCESS_SEARCH_TRACK is dispatched when the api call is successful', () => {
    const res1 = requestTrackDetailsGenerator.next().value;
    const res2 = requestTrackDetailsGenerator.next().value;
    expect(res2).toEqual(call(getTrackDetails, trackId));
    const trackDetails = { songName: 'Billie Jean', songArtist: 'Michael Jackson' };

    const data = {
      results: [{ songName: 'Billie Jean', songArtist: 'Michael Jackson' }]
    };

    expect(requestTrackDetailsGenerator.next(apiResponseGenerator(true, data)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_SEARCH_TRACK,
        response: { data, trackDetails }
      })
    );
  });

  it('should ensure that action FAILURE_SEARCH_TRACK is dispatched when the api call falls', () => {
    requestTrackDetailsGenerator = requestTrackDetails({ trackId });
    const res1 = requestTrackDetailsGenerator.next().value;
    const res2 = requestTrackDetailsGenerator.next().value;
    expect(res2).toEqual(call(getTrackDetails, trackId));

    const errorRes = translate('something_went_wrong');

    expect(requestTrackDetailsGenerator.next(apiResponseGenerator(false, errorRes)).value).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_SEARCH_TRACK,
        error: errorRes
      })
    );
  });

  it('should use songsCache if available', () => {
    const trackDetails = { songName: 'song' };
    const testSagaCache = { 1234: { results: [trackDetails] } };
    requestTrackDetailsGenerator = requestTrackDetails({ trackId, testSagaCache });
    const res = requestTrackDetailsGenerator.next().value;
    expect(res).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_SEARCH_TRACK,
        response: {
          data: testSagaCache[trackId],
          trackDetails
        }
      })
    );
  });
});
