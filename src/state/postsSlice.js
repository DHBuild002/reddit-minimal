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
  async () => {
    try {
      const response = await axios.get("http://www.reddit.com/r/pics.json");

      console.log(response.data);
      console.log(response.data.children.slice(0, 3));

      const fetchedPosts = response.data.children.slice(0, 3).map((child) => {
        const postData = child.data.data;
        const postImage = postData.preview?.images[0].source?.url;
        const preview = postImage ? HTMLDecoder(postImage) : null;
        return { ...postData, preview };
      });
      console.log(fetchedPosts);
      return fetchedPosts;
    } catch (error) {
      return error;
    }
  }
);
const redditSlice = createSlice({
  name: "reddit",
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
