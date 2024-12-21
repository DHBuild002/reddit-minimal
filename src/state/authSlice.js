import { createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "../app/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    username: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(getAccessToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAccessToken.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.access_token;
    });
    builder.addCase(getAccessToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
