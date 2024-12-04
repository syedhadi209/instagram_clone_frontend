import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { data: null },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    removeUser(state, action) {
      state.data = null;
    },
  },
});

export { userSlice };
export const { setUser, removeUser } = userSlice.actions;
