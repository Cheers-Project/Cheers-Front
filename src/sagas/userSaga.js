import { call, put, takeLatest } from 'redux-saga/effects';

import { login, logout } from 'redux/modules/user';
import * as userAPI from 'api/user';

function* loginSaga(action) {
  const { data } = yield call(() => userAPI.login(action.payload));
  try {
    if (data.accessToken) localStorage.setItem('accessToken', data.accessToken);

    yield put({ type: `${action.type}Success`, payload: data.accessToken });
  } catch (e) {
    const errInfo = {
      errMsg: data.msg,
      e,
    };
    yield put({ type: `${action.type}Failure`, payload: errInfo });
  }
}

function* logoutSaga(action) {
  const { data } = yield call(() => userAPI.logout());
  try {
    localStorage.removeItem('accessToken');
    yield put({ type: `${action.type}Success` });
  } catch (e) {
    const errInfo = {
      errMsg: data.msg,
      e,
    };
    yield put({ type: `${action.type}Failure`, payload: errInfo });
  }
}

export default function* userSaga() {
  yield takeLatest(login, loginSaga);
  yield takeLatest(logout, logoutSaga);
}
