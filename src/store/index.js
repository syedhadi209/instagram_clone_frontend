import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserSlice";
import { ModalSlice } from "./slices/ModalSlice";

const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    modalSlice: ModalSlice.reducer,
  },
});

export default store;
