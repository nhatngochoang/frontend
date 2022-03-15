import { incrementSaga, incrementSagaSuccess } from './counterSlice';
import { takeEvery, delay, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('Waiting 1s');
  yield delay(1000);
  console.log('Waiting done');
  yield put(incrementSagaSuccess(action.payload));
}
export default function* counterSaga() {
  console.log('Counter saga');

  //   yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
  yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
