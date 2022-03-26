import { createSlice } from '@reduxjs/toolkit';
import jwt from 'jwt-decode';

const initialState = {
  user: {
    profileImg: null,
    nickname: null,
  },
  isLoggedIn: false,
  errMsg: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeError(state) {
      state.errMsg = null;
      state.error = null;
    },
    login(state) {
      state.isLoggedIn = false;
      state.errMsg = null;
      state.error = null;
    },
    loginSuccess(state, action) {
      const userInfo = jwt(action.payload);
      const { nickname, profileImg } = userInfo;
      state.user = { ...state.user, nickname, profileImg };
      state.isLoggedIn = true;
      state.errMsg = null;
      state.error = null;
    },
    loginFailure(state, action) {
      const { errMsg, e } = action.payload;
      state.isLoggedIn = false;
      state.errMsg = errMsg;
      state.error = e;
    },
    logout(state) {
      state.errMsg = null;
      state.error = null;
    },
    logoutSuccess(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.errMsg = null;
      state.error = null;
    },
    logoutFailure(state, action) {
      const { errMsg, e } = action.payload;
      state.errMsg = errMsg;
      state.error = e;
    },
    checkLogin(state) {
      state.isLoggedIn = true;
    },
  },
});

export const {
  initializeError,
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  checkLogin,
} = userSlice.actions;

export default userSlice.reducer;
