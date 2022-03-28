import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
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
    logout(state) {
      state.errMsg = null;
      state.error = null;
    },
    logoutSuccess(state) {
      state.userInfo = null;
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
  logout,
  logoutSuccess,
  logoutFailure,
  checkLogin,
} = userSlice.actions;

export default userSlice.reducer;
