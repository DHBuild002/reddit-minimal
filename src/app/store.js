import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../state/themeSlice";
import redditReducer from "../state/postsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    posts: redditReducer,
  },
});
