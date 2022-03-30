import { combineReducers, configureStore } from '@reduxjs/toolkit';

import modal from 'redux/modules/modal';

const reducer = combineReducers({ modal });

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
