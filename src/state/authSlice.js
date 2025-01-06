import { createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "../app/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    username: "",
    loading: false,
    error: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.username = null;
    },
    selectUsername: (state) => {
      return state.username;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccessToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAccessToken.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.access_token;
      console.log("Fulfilled payload:", action.payload.access_token); // Log the payload
    });
    builder.addCase(getAccessToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { setUserInfo, logout, selectUsername } = authSlice.actions;
export default authSlice.reducer;
