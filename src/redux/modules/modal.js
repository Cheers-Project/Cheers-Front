import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuModal: false,
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
    toggleMenuModal(state, action) {
      state.menuModal = action.payload;
    },
  },
});

export const { initializeModal, openUserModal, toggleMenuModal } =
  modalSlice.actions;

export default modalSlice.reducer;
