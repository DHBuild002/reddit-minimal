import React from "react";
import ReduxRedditFetcher from "../app/redditFetcher.js";
import { useSelector } from "react-redux";

import "./styles/post.css";

import { selectThemeMode } from "../state/themeSlice";
import Interactor from "./Interactor.js";

const Post = () => {
  const theme = useSelector(selectThemeMode); // Adjust this selector based on your theme slice
  return (
    <div
      className={`post-container ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      <ReduxRedditFetcher />
      {/* <Interactor /> */}
    </div>
  );
};

export default Post;
