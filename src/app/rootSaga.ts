import counterSaga from '../features/counter/counterSaga';
import { all } from 'redux-saga/effects';
import { incrementAsync } from '../sagas';
import authSaga from '../features/auth/authSaga';

export default function* rootSaga() {
  yield all([counterSaga(), incrementAsync(), authSaga()]);
}
