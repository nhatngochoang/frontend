import counterSaga from '../features/counter/counterSaga';
import { all } from 'redux-saga/effects';
import { incrementAsync } from '../sagas';
import authSaga from '../features/auth/authSaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';

export default function* rootSaga() {
   yield all([counterSaga(), incrementAsync(), authSaga(), dashboardSaga()]);
}
