import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export const selectMessagesState = (state) => state.messages;
export const selectMessages = (state) => state.messages.messages;

export const fetchUserMessages = createAsyncThunk(
    "reddit/fetchPosts",
    initialState,
    
);
