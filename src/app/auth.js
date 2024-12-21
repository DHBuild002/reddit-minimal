import { createAsyncThunk } from "@reduxjs/toolkit";
import * as dotenv from "dotenv";
dotenv.config();

const REDIRECT_URI = `${window.location.origin}/`; // Important for local dev
const REACT_APP_CLIENT_ID = process.env.CLIENT_ID; // Replace with your app ID
const REACT_APP_REDDIT_SECRET = process.env.REDDIT_SECRET;

export const redditLogin = () => {
  const authURL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=RANDOM_STRING&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&duration=permanent&scope=identity read privatemessages`;
  window.location.href = authURL;
};

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async (code, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://www.reddit.com/api/v1/access_token",
        {
          method: postMessage,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              `${REACT_APP_CLIENT_ID}:${REACT_APP_REDDIT_SECRET}}`
            )}`,
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
          }),
        }
      );
      if (response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || "Failed to get access token");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
