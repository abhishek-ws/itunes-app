import { getSearches } from '@app/services/searchApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { gridContainerCreators, gridContainerTypes } from './reducer';
// Individual exports for testing
const { GET_SEARCH_TUNES } = gridContainerTypes;

const { successGetSearchTunes, failureGetSearchTunes } = gridContainerCreators;

export function* defaultFunction(action) {
  const response = yield call(getSearches, action.searchTerm);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSearchTunes(data));
  } else {
    yield put(failureGetSearchTunes(data));
  }
}

export default function* gridContainerSaga() {
  yield takeLatest(GET_SEARCH_TUNES, defaultFunction);
}
