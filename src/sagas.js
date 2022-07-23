import { call, put } from '@redux-saga/core/effects';

export const delayFunc = (ms) => new Promise(res => setTimeout(res, ms))


export function* incrementAsync() {
   // use the call Effect
   yield call(delayFunc, 1000)
   yield put({ type: 'increment' })
}