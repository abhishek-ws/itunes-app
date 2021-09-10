import { call, put, takeLatest, select } from 'redux-saga/effects';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';
import { getSongs, getTrackDetails } from '@services/songsApi';
import { selectSongsCache } from './selectors';
import { isEmpty } from 'lodash';

const { SEARCH_ITUNES, SEARCH_TRACK } = itunesContainerTypes;
const { successSearchItunes, failureSearchItunes, successSearchTrack, failureSearchTrack } = itunesContainerCreators;

// const songsCache = selectSongsCache();

export function* requestSearchItunes(action) {
  const res = yield call(getSongs, action.searchTerm);
  const { data, ok } = res;
  if (ok) {
    yield put(successSearchItunes(data));
  } else {
    yield put(failureSearchItunes(data));
  }
}

export function* requestTrackDetails(action) {
  let songsCache;
  if (!isEmpty(action.testSagaCache)) {
    songsCache = action.testSagaCache;
  } else {
    songsCache = yield select(selectSongsCache());
  }
  if (!isEmpty(songsCache) && songsCache[action.trackId]) {
    const data = songsCache[action.trackId];
    yield put(successSearchTrack(data));
  } else {
    const res = yield call(getTrackDetails, action.trackId);
    const { data, ok } = res;
    if (ok) {
      yield put(successSearchTrack(data));
    } else {
      yield put(failureSearchTrack(data));
    }
  }
}

export default function* itunesContainerSaga() {
  yield takeLatest(SEARCH_ITUNES, requestSearchItunes);
  yield takeLatest(SEARCH_TRACK, requestTrackDetails);
}
