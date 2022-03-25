import { call, put, takeLatest } from 'redux-saga/effects';
import jwt from 'jwt-decode';

import { login } from 'redux/modules/user';
import * as userAPI from 'api/user';

function* loginSaga(action) {
  const { data } = yield call(() => userAPI.login(action.payload));
  try {
    localStorage.setItem('accessToken', data.accessToken);
    const userInfo = jwt(data.accessToken);
    yield put({ type: `${action.type}Success`, payload: userInfo });
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
}
