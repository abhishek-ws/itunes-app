import { call, put, takeLatest, select } from 'redux-saga/effects';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';
import { getSongs, getTrackDetails } from '@services/songsApi';
import { selectSongsCache } from './selectors';
import { isEmpty } from 'lodash';
import { translate } from '@app/components/IntlGlobalProvider/';

const { SEARCH_ITUNES, SEARCH_TRACK } = itunesContainerTypes;
const { successSearchItunes, failureSearchItunes, successSearchTrack, failureSearchTrack } = itunesContainerCreators;

export function* requestSearchItunes(action) {
  const res = yield call(getSongs, action.searchTerm);
  const { data, ok } = res;
  if (ok) {
    yield put(successSearchItunes(data));
  } else {
    const error = data?.originalError?.message ?? translate('something_went_wrong');
    yield put(failureSearchItunes(error));
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
    const response = { data, trackDetails: data.results[0] };
    yield put(successSearchTrack(response));
  } else {
    const res = yield call(getTrackDetails, action.trackId);
    const { data, ok } = res;
    if (ok) {
      const response = { data, trackDetails: data.results[0] };
      yield put(successSearchTrack(response));
    } else {
      const error = data?.originalError?.message ?? translate('something_went_wrong');
      yield put(failureSearchTrack(error));
    }
  }
}

export default function* itunesContainerSaga() {
  yield takeLatest(SEARCH_ITUNES, requestSearchItunes);
  yield takeLatest(SEARCH_TRACK, requestTrackDetails);
}
