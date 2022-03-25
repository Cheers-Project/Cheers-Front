import { createSlice } from '@reduxjs/toolkit';

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
      const { nickname } = action.payload;
      state.user = { ...state.user, nickname };
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
  },
});

export const { initializeError, login, loginSuccess, loginFailure } =
  userSlice.actions;

export default userSlice.reducer;
