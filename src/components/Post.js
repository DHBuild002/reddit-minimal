import React from "react";
import ReduxRedditFetcher from "../app/redditFetcher.js";
import "./styles/post.css";

const Post = () => {
  return (
    <div className="post-container justify-center flex items-center">
      <ReduxRedditFetcher />
    </div>
  );
};

export default Post;
