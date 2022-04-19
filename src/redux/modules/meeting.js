import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  contents: '',
  meetingDate: '',
  meetingTime: '',
  totalNumber: 2,
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
    overwriteMeeting: (state, { payload }) => payload,
    changeTitle: (state, { payload }) => {
      state.title = payload;
    },
    changeContents: (state, { payload }) => {
      state.contents = payload;
    },
    increaseNumber: (state) => {
      state.totalNumber = +state.totalNumber + 1;
    },
    decreaseNumber: (state) => {
      state.totalNumber = +state.totalNumber - 1;
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
  overwriteMeeting,
  changeTitle,
  changeContents,
  increaseNumber,
  decreaseNumber,
  changeTime,
  changeDate,
  changeLocation,
} = meetingSlice.actions;

export default meetingSlice.reducer;
