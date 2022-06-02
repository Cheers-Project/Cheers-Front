import { combineReducers, configureStore } from '@reduxjs/toolkit';

import modal from 'redux/modules/modal';
import meeting from 'redux/modules/meeting';

const reducer = combineReducers({
  modal,
  meeting,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
