import counterSaga from '../features/counter/counterSaga';
import { all } from 'redux-saga/effects';
import { incrementAsync } from '../sagas';

export default function* rootSaga() {
  console.log('Root Saga');
  yield all([counterSaga(), incrementAsync()]);
}
