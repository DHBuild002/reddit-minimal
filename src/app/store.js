import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../state/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
