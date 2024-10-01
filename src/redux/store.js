// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./LoginSlice";
const store = configureStore({
  reducer: {
    login: LoginSlice,
  },
});

export default store;
