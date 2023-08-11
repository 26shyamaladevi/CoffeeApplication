// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails: (state, action) => {
      //state = action.payload;
      return {
        ...state,
        type: "ADD_USER_DETAILS",
        payload: action.payload,
      };
    },
    clearUserDetails: () => {
      return undefined;
    },
  },
});

export const { addUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
