import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import themeReducer from "../state/themeSlice";
import redditReducer from "../state/postsSlice";
import loggerMiddleware from "../state/middleware/loggerMiddleware";
import authReducer from "../state/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    posts: redditReducer,
    middleware: [loggerMiddleware],
    auth: authReducer,
  },
});
