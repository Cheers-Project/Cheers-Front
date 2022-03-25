import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import user from 'redux/modules/user';
import userSaga from 'sagas/userSaga';

const reducer = combineReducers({ user });

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export function* rootSaga() {
  yield all([userSaga()]);
}

const store = configureStore({
  reducer,
  devTools: true,
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
