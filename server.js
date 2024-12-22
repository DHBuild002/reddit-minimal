// File is here to proxy request to Reddit API
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const queryString = require("querystring");

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
// app.use(cors());

const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REACT_APP_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Redirect to oAuth provider
app.get("/login", (req, res) => {
  const authURL = `https://www.reddit.com/api/v1/authorize?${queryString.stringify(
    {
      client_id: REACT_APP_CLIENT_ID,
      response_type: "code",
      state: "random_string", // Add a secure random string here to prevent CSRF attacks
      redirect_uri: REDIRECT_URI,
      duration: "temporary", // 'temporary' or 'permanent'
      scope: "identity",
    }
  )}`;
  res.redirect(authURL);
});

// Handle Reddit Callback and EXC Code for a Token
app.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send("Authorization code not provided");
  }
  try {
    const tokenResponse = await axios.post(
      "https://wwww.reddit.com/api/v1/access_token",
      queryString.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        auth: {
          username: REACT_APP_CLIENT_ID,
          password: REACT_APP_CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const { access_token, token_type } = tokenResponse.data;
    const userInfo = await axios.get("https://oauth.reddit.com/api/v1/me", {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });
    res.json({
      access_token,
      user_info: userInfo.data,
    });
  } catch (error) {
    console.error(
      "Error exchanging code for token:",
      error.response?.data || error.message
    );
    res.status(500).send("Authentication Error");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server now live on: http://localhost:${PORT}`);
});
