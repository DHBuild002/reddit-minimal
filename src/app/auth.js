import { createAsyncThunk } from "@reduxjs/toolkit";
// const dotenv = require("dotenv");
// dotenv.config();

const REDIRECT_URI = process.env.REDIRECT_URI;
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID; // Replace with your app ID
const REACT_APP_REDDIT_SECRET = process.env.REACT_APP_REDDIT_SECRET;

// // Unique state value for the request
// const crypto = require("crypto");
// const stateStore = new Map(); // Simple in-memory store for demo purposes

export const redditLogin = () => {
  // const state = crypto.randomBytes(16).toString("hex");
  // stateStore.set(state, true);
  const authURL = `https://www.reddit.com/api/v1/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&state=anything&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&duration=permanent&scope=identity read privatemessages`;
  window.location.href = authURL;
};

// export const getAccessToken = createAsyncThunk(
//   "auth/getAccessToken",
//   (token) => async (dispatch) => {
//     try {
//       dispatch({ type: "auth/getAccessToken/pending" });
//       dispatch({
//         type: "auth/getAccessToken/fulfilled",
//         payload: token,
//       });
//     } catch (error) {
//       dispatch({
//         type: "auth/getAccessToken/rejected",
//         payload: error.message,
//       });
//     }
//   }
// );

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async ({ access_token }) => {
    if (!access_token) {
      throw new Error("Access Token is missing");
    }
    return { access_token };
  }
);

// createAsyncThunk(
//   "auth/getAccessToken",
//   async (code, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "https://www.reddit.com/api/v1/access_token",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             Authorization: `Basic ${btoa(
//               `${REACT_APP_CLIENT_ID}:${REACT_APP_REDDIT_SECRET}}`
//             )}`,
//           },
//           body: new URLSearchParams({
//             grant_type: "authorization_code",
//             code,
//             redirect_uri: REDIRECT_URI,
//           }),
//         }
//       );
//       if (response.ok) {
//         const errorData = await response.json();
//         return rejectWithValue(errorData.error || "Failed to get access token");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
