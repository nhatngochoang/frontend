import { authActions, LoginPayload } from './authSlice';
import { fork, take, call, delay, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { history } from '../../history';

function* handleLogin(payload: LoginPayload) {
  try {
    console.log('Login', payload);
    yield delay(5000); // api ➤ get token
    localStorage.setItem('access_token', 'asdasdas'); // set token
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Nhat',
      })
    );
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
  // navigate to admin page
}

function* handleLogout() {
  yield delay(5000);
  localStorage.removeItem('access_token');
  // navigate to login page
  yield history.push('/');
}

function* watchLoginFlow() {
  // loop
  while (true) {
    // Handle Token
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      // wait login action ➤ handle
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
    // after login done, wait logout action ➤ handle
    yield take(authActions.logout.type);
    yield call(handleLogout); // must logout then logblocking ➤ not fork
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
