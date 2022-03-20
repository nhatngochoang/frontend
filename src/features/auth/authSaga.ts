import { authActions, LoginPayload } from './authSlice';
import { fork, take } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleLogin(payload: LoginPayload) {}

function* handleLogout() {}

function* watchLoginFlow() {
  // wait login action ➤ handle
  const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
  yield fork(handleLogin, action.payload);
  // after login done, wait logout action ➤ handle
  yield take(authActions.logout.type);
  yield fork(handleLogout);
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
