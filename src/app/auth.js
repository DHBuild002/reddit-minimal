import { createAsyncThunk } from "@reduxjs/toolkit";

const REDIRECT_URI = process.env.REDIRECT_URI;
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export const redditLogin = () => {
  const BASE_URL = "https://www.reddit.com/api/v1/authorize";
  const CLIENT_ID = `client_id=${REACT_APP_CLIENT_ID}`;
  const RESPONSE_TYPE = "response_type=code";
  const STATE = "state=anything";
  const REDIRECT = `redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  const DURATION = "duration=permanent";
  const SCOPE = "scope=identity read privatemessages";

  const authURL = `${BASE_URL}?${CLIENT_ID}&${RESPONSE_TYPE}&${STATE}&${REDIRECT}&${DURATION}&${SCOPE}`;

  window.location.href = authURL;
};

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async ({ access_token }) => {
    if (!access_token) {
      throw new Error("Access Token is missing");
    }
    localStorage.setItem("access_token", access_token);
    return { access_token };
  }
);
