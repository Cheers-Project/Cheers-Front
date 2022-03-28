import { call, put, takeLatest } from 'redux-saga/effects';

import { logout } from 'redux/modules/user';
import * as userAPI from 'api/user';

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
  yield takeLatest(logout, logoutSaga);
}
