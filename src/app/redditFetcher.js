import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRedditPosts } from "../state/postsSlice";
import "../components/styles/post.css";
import { HTMLDecoder } from "./utils/htmlDecoder";
import RedditIcon from "../assets/Reddit_Icon_2Color.jpg";
import FastTravel from "../components/FastTravel.js";
import Interactor from "../components/Interactor.js";

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
      className={`w-full flex justify-center ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {posts.map((post, index) => (
        <div
          key={index}
          className={`border border-blue-400 p-2 justify-center items-center ${
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
            <>
              <img
                className="post-img"
                style={{ maxWidth: "33.33%" }}
                src={HTMLDecoder(post.preview)}
                alt="reddit img"
              />
              <div>
                <FastTravel />
                <Interactor />
              </div>
            </>
          ) : (
            <>
              <img
                className="post-img"
                style={{ maxWidth: "33.33%" }}
                src={RedditIcon}
                alt="reddit img"
              />
              <Interactor />
            </>
          )}
        </div>
      ))}
      <FastTravel />
    </div>
  );
};

export default ReduxRedditFetcher;
