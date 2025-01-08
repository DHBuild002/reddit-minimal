import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, logout } from "../state/authSlice";
import { getAccessToken } from "../app/auth";

const AuthButton = () => {
  const dispatch = useDispatch();

  // Select data from the Redux store
  const { accessToken, username, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    const status = params.get("status");

    if (status === "success" && token) {
      dispatch(getAccessToken({ access_token: token }));
    }

    const fetchUserInfo = async () => {
      if (!accessToken) return;

      try {
        const response = await fetch("https://oauth.reddit.com/api/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setUserInfo(data.name));
          console.log("User: " + username);

          // Once user info is returned, we know the token has been stored and used to fetchUserInfo
          window.history.replaceState({}, document.text, "/");
        } else {
          console.error("Failed to fetch");
        }
      } catch (error) {
        console.error("Error in fetch of user info: ", error);
      }
    };
    fetchUserInfo();
  }, [dispatch, accessToken, username]);

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth";
    dispatch(getAccessToken());
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {username ? (
        <div className="flex justify-center">
          <h2>Hello, {username}!</h2>
          <button
            onClick={handleLogout}
            className="container btn w-full text-center"
          >
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} className="btn flex w-1/2 p-5 rounded-lg">
          Login with Reddit
        </button>
      )}
    </>
  );
};

export default AuthButton;
