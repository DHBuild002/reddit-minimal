import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeClass: "list-item",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.themeClass === "list-item") {
        state.themeClass = "list-item_light";
      } else if (state.themeClass === "list-item_light") {
        state.themeClass = "list-item_dark";
      } else {
        state.themeClass = "list-item";
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
