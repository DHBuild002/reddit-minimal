// Import all necessary server packages
const express = require("express");
const axios = require("axios");
const querystring = require("querystring");

// Call the .env file to collect the relevant data for our client on the Reddit API
require("dotenv").config();

// Configure a variable for the application and the servers port number
const app = express();
const PORT = 3001;

// Configure variables to speak to the reddit API endpoints
const REDDIT_AUTH_URL = "https://www.reddit.com/api/v1/authorize";
const REDDIT_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";

// Configure variables to speak to the env file - Our apps details
const REDIRECT_URI = "http://localhost:3001/callback";
const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

// Make our first request - Authentication
app.get("/auth", (req, res) => {
  // Open a params variable, with querystring.stringify to convert the response into text:
  const params = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    state: "randomstring",
    redirect_uri: REDIRECT_URI,
    duration: "temporary",
    scope: "identity",
  });
  // Make the request to the reddit API, using res.redirect, when a user navigates to the /auth endpoint from our app:
  res.redirect(`${REDDIT_AUTH_URL}?${params}`);
});

// After our user allows the application on the reddit.com side, they will be redirected to the callback endpoint, and this code will run:
app.get("/callback", async (req, res) => {
  // Code returns as a query
  const { code, state } = req.query;
  // If no code or state is returned, then return an error:
  if (!code || !state) {
    return res.status(400).send("Error: Missing code or state");
  }

  // Once code is returned, open a try catch to either get the token response data and convert to a string or return an error:
  try {
    const tokenResponse = await axios.post(
      // Send a request to the reddit URL - /access_token endpoint:
      REDDIT_TOKEN_URL,
      // With the auth code we got back from our auth endpoint, our code and the redirect URI we plan to use
      querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        // REQUIRED: Redirect URI is supplied on the post method too, as a second layer of authentication, it has not function outside of this:
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

    // one the tokenResponse is fulfilled, we then get a .data object that we can review and store as our access_token:
    const { access_token } = tokenResponse.data;
    // Setup a variable to point to APP address:
    const localhost = "http://localhost:3000?";

    // If statement to confirm that the Access_token was returned, and then return user to the homepage as a result:
    if (access_token) {
      // Save token if needed, then redirect
      return res.redirect(
        `${localhost}status=success&access_token=${access_token}`
      );
    } else {
      return res.redirect(`${localhost}status=error`);
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
