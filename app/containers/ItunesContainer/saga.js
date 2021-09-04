import { call, put, takeLatest } from 'redux-saga/effects';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';
import { getSongs } from '@services/songsApi';

const { SEARCH_ITUNES } = itunesContainerTypes;
const { successSearchItunes, failureSearchItunes } = itunesContainerCreators;

export function* requestSearchItunes(action) {
  const res = yield call(getSongs, action.searchTerm);
  const { data, ok } = res;
  if (ok) {
    yield put(successSearchItunes(data));
  } else {
    yield put(failureSearchItunes(data));
  }
}

export default function* itunesContainerSaga() {
  yield takeLatest(SEARCH_ITUNES, requestSearchItunes);
}
