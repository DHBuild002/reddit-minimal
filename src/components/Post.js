import React from "react";
import RedditFetcher from "../app/redditAPI.js";
import "./styles/post.css";

const Post = () => {
  return (
    <div className="post-container">
      <RedditFetcher />
    </div>
  );
};

export default Post;
