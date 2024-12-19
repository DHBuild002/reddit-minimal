import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRedditPosts } from "../state/postsSlice";
import "../components/styles/post.css";
import { HTMLDecoder } from "./utils/htmlDecoder";
import RedditIcon from "../assets/Reddit_Icon_2Color.jpg";

// decode HTML
const ReduxRedditFetcher = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

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
    <div>
      {posts.map((post, index) => (
        <div
          key={index}
          className="border border-blue-400 bg-blue-200flex items-center justify-center m-2 p-2"
        >
          <h2>{post.title}</h2>
          <p>{post.selfText}</p>
          <a
            href={`https://reddit.com${post.permalink}`}
            className="bg-white shadow-sm p-2 m-2"
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
