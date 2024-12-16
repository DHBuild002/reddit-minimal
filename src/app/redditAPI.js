import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/styles/post.css";

// decode HTML
import { HTMLDecoder } from "./utils/htmlDecoder";
// Redux action types

const RedditFetcher = () => {
  const [post, setPost] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Thunk aciton for API Call
    const fetchPost = async () => {
      try {
        const API_URL = "http://www.reddit.com/r/pics.json";
        const response = await axios.get(`${API_URL}`);
        const postData = response.data.data.children[0].data;
        const postImage =
          response.data.data.children[0].data.preview.images[0].source.url;

        if (postImage) {
          const decodedURL = HTMLDecoder(postImage);
          setPreview(decodedURL);
        } else {
          setPreview(null);
        }
        // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        // const proxiedImage = `${proxyUrl}${postImage}`;

        setPost(postData);
        console.log("Fetch Reddit Post Data:", response);
        console.log("Post Image URL:", postImage);
      } catch (error) {
        console.log("Error fetching reddit posts:", error.message);
      }
    };
    fetchPost();
  }, []);

  return (
    <div>
      <h1>Reddit Post</h1>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.selfText}</p>
          {preview ? (
            <img
              className="post-img"
              style={{ maxWidth: "100%" }}
              src={preview}
              alt="reddit img"
            />
          ) : (
            <p>No post Data returned</p>
          )}
          <a href={`https://reddit.com${post.permalink}`}>View Post</a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RedditFetcher;
