import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuModal: false,
  alarmModal: false,
  userModal: {
    loginModal: false,
    registModal: false,
    isOpen: false,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    initializeModal: () => initialState,
    openUserModal(state, action) {
      state.userModal = {
        ...initialState.userModal,
        [action.payload.modal]: true,
        isOpen: true,
      };
    },
    toggleModal(state, { payload }) {
      state[payload.target] = payload.visible;
    },
  },
});

export const { initializeModal, openUserModal, toggleModal } =
  modalSlice.actions;

export default modalSlice.reducer;
