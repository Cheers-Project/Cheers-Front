import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  contents: '',
  meetingDate: '',
  meetingTime: '',
  totalNumber: '',
  location: {
    placeName: '',
    addressName: '',
    coordinates: ['', ''],
  },
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    initializeForm: () => initialState,
    changeTitle: (state, { payload }) => {
      state.title = payload;
    },
    changeContents: (state, { payload }) => {
      state.contents = payload;
    },
    changeNumber: (state, { payload }) => {
      state.totalNumber = payload;
    },
    changeTime: (state, { payload }) => {
      state.meetingTime = payload;
    },
    changeDate: (state, { payload }) => {
      state.meetingDate = payload;
    },
    changeLocation: (state, { payload }) => {
      state.location = { ...state.location, ...payload };
    },
  },
});

export const {
  initializeForm,
  changeTitle,
  changeContents,
  changeNumber,
  changeTime,
  changeDate,
  changeLocation,
} = meetingSlice.actions;

export default meetingSlice.reducer;
