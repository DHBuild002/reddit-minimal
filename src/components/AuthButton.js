import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, logout } from "../state/authSlice";
import { getAccessToken } from "../app/auth";
const AuthButton = () => {
  const dispatch = useDispatch();

  // Select data from the Redux store
  const { accessToken, username } = useSelector((state) => state.auth);

  useEffect(() => {
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
        } else {
          console.error("Failed to fetch");
        }
      } catch (error) {
        console.error("Error in fetch of user info: ", error);
      }
    };
    fetchUserInfo();
  }, [accessToken, dispatch]);

  const handleLogin = () => {
    // window.location.href = "http://localhost:3001/auth";
    dispatch(getAccessToken());
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      {username ? (
        <div>
          <h2>Hello, {username}!</h2>
          <button onClick={handleLogout} className="container btn">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} className="container btn">
          Sign In to your Reddit account
        </button>
      )}
    </>
  );
};

export default AuthButton;
