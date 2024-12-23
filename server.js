require("dotenv").config();
const express = require("express");
const axios = require("axios");
const rp = require("request-promise");
const fs = require("fs");

const app = express();
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const USER_AGENT = process.env.USER_AGENT;

// Unique state value for the request
const crypto = require("crypto");
const stateStore = new Map(); // Simple in-memory store for demo purposes

// Redirect to Reddit for authentication
app.get("/auth/reddit", (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");
  stateStore.set(state, true);
  const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${REDIRECT_URI}&duration=permanent&scope=identity read submit`;
  res.redirect(authUrl);
});

// Handle the callback from Reddit
app.get("/reddit/callback", async (req, res) => {
  const { code } = req.query;

  // Check for a code
  if (!code) {
    return res.status(400).send("Missing authorization code");
  }

  const options = {
    method: "POST",
    uri: "http://wwww.reddit.com/v1/api/access_token",
    auth: {
      user: CLIENT_ID,
      password: CLIENT_SECRET,
    },
    formData: {
      grant_type: "authorization_code",
      code,
      redirect_url: REDIRECT_URI,
    },
    headers: {
      "User-Agent": USER_AGENT,
    },
    // Redirect back to the client with a success indication
  };
  try {
    const response = await rp(options);
    fs.writeFile("reddit_token.txt", response.access_token, (err) => {
      if (err) {
        console.error("Could not get token");
      } else {
        console.log("Token Saved");
      }
    });
    res.send("Logged In!");
  } catch (error) {
    console.error(error);
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
