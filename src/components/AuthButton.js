import React from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../state/authSlice";
import { getAccessToken } from "../app/auth";
const AuthButton = () => {
  // const dispatch = useDispatch();

  const handleLogin = () => {
    // try {
    //   const authData = dispatch(getAccessToken());
    //   console.log("Auth Data: ", authData);
    //   const username = authData.username;
    //   dispatch(setUserInfo(username));
    // } catch (error) {
    //   console.error("Login Failed: ", error);
    // }
    window.location.href = "http://localhost:3001/auth";
  };
  return (
    <button onClick={handleLogin} className="container btn">
      Sign In to your Reddit account
    </button>
  );
};

export default AuthButton;
