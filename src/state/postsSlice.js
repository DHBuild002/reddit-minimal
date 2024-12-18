import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HTMLDecoder } from "../app/utils/htmlDecoder";
import axios from "axios";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchRedditPosts = createAsyncThunk(
  "reddit/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://www.reddit.com/r/pics.json");

      // Validate response data
      if (
        !response.data ||
        !response.data.data ||
        !response.data.data.children
      ) {
        throw new Error("Invalid API response structure");
      }
      const fetchedPosts = response.data.data.children
        .slice(0, 3)
        .map((child) => {
          const postData = child.data;
          const postImage = postData.preview?.images?.[0]?.source?.url;
          const preview = postImage ? HTMLDecoder(postImage) : null;
          return { ...postData, preview };
        });
      console.log(fetchedPosts);
      return fetchedPosts;
    } catch (error) {
      console.error("Error fetching Reddit posts:", error);
      // Use rejectWithValue to pass a serializable error message
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);
const redditSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRedditPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRedditPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchRedditPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default redditSlice.reducer;
