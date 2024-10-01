import { createSlice } from "@reduxjs/toolkit";

// Get the initial value of `isLoggedIn` from localStorage (if available)
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true", // retrieve stored boolean
};

const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload; // update Redux state
      localStorage.setItem("isLoggedIn", action.payload); // store value in localStorage
    },
  },
});

// Export the action
export const { setIsLoggedIn } = LoginSlice.actions;

// Export the reducer
export default LoginSlice.reducer;
