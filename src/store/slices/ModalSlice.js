import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "modalSlice",
  initialState: { isModalOpen: false },
  reducers: {
    openModal(state, action) {
      state.isModalOpen = true;
    },
    closeModal(state, action) {
      state.isModalOpen = false;
    },
  },
});

export { ModalSlice };
export const { openModal, closeModal } = ModalSlice.actions;
