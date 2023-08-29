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
    setProfilePic(state, action) {
      state.data.profile_picture = action.payload;
    },
    updateUsername(state, action) {
      state.data.username = action.payload;
    },
    updateEmail(state, action) {
      state.data.email = action.payload;
    },
  },
});

export { userSlice };
export const {
  setUser,
  removeUser,
  setProfilePic,
  updateUsername,
  updateEmail,
} = userSlice.actions;
