const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
require("dotenv").config();

const app = express();
const PORT = 3001;

const REDDIT_AUTH_URL = "https://www.reddit.com/api/v1/authorize";
const REDDIT_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";
const REDIRECT_URI = "http://localhost:3001/callback";
const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

app.get("/auth", (req, res) => {
  const params = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    state: "randomstring",
    redirect_uri: REDIRECT_URI,
    duration: "temporary",
    scope: "identity",
  });
  res.redirect(`${REDDIT_AUTH_URL}?${params}`);
});

app.get("/callback", async (req, res) => {
  const { code, state } = req.query;
  if (!code || !state) {
    return res.status(400).send("Error: Missing code or state");
  }

  try {
    const tokenResponse = await axios.post(
      REDDIT_TOKEN_URL,
      querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${CLIENT_ID}:${CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;
    const homepage = "http://localhost:3000?";
    if (access_token) {
      // Save token if needed, then redirect
      return res.redirect(`${homepage}status=success`);
    } else {
      return res.redirect(`${homepage}status=error`);
    }
  } catch (err) {
    console.error("Error during callback:", err.message);
    res.status(500).send("Error: Failed during token exchange");
  }
});

app.use((req, res) => {
  res.status(404).send("Endpoint not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
