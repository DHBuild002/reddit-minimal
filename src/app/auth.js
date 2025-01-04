import { createAsyncThunk } from "@reduxjs/toolkit";

const REDIRECT_URI = process.env.REDIRECT_URI;
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export const redditLogin = () => {
  const authURL = `https://www.reddit.com/api/v1/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&state=anything&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&duration=permanent&scope=identity read privatemessages`;
  window.location.href = authURL;
};

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async ({ access_token }) => {
    if (!access_token) {
      throw new Error("Access Token is missing");
    }
    return { access_token };
  }
);
