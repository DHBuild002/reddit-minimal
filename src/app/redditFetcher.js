import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRedditPosts } from "../state/postsSlice";
import "../components/styles/post.css";
import { HTMLDecoder } from "./utils/htmlDecoder";
import RedditIcon from "../assets/Reddit_Icon_2Color.jpg";

import { selectPosts, selectLoading, selectError } from "../state/postsSlice";
import { selectThemeMode } from "../state/themeSlice";

const ReduxRedditFetcher = () => {
  const dispatch = useDispatch();

  // const { posts, loading, error } = useSelector((state) => state.posts);

  // Check for current Dark/Light Mode
  const theme = useSelector(selectThemeMode); // Adjust this selector based on your theme slice

  // Clearer way of writing above:
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchRedditPosts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching posts: {error}</p>;
  }

  return (
    <div
      className={`justify-center w-full ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {posts.map((post, index) => (
        <div
          key={index}
          className={`border border-blue-400 flex items-center justify-center p-2 ${
            theme === "dark" ? "bg-black text-white" : "bg-white"
          }`}
        >
          <h2>{post.title}</h2>
          <p>{post.selfText}</p>
          <a
            href={`https://reddit.com${post.permalink}`}
            className={`${
              theme === "dark"
                ? "text-white bg-black m-4 p-4 shadow-md border border-white rounded-md"
                : "text-blue bg-white m-4 p-4 shadow-md border border-blue rounded-md"
            }`}
          >
            View Post
          </a>
          {post.preview ? (
            <img
              className="post-img p-"
              style={{ maxWidth: "100px" }}
              src={HTMLDecoder(post.preview)}
              alt="reddit img"
            />
          ) : (
            <img
              className="post-img p-5 bg-white w-2xl"
              style={{ maxWidth: "100%" }}
              src={RedditIcon}
              alt="reddit img"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ReduxRedditFetcher;
