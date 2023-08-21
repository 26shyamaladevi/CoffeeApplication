// actions.js
import { ADD_USER_DETAILS, CLEAR_USER_DETAILS } from "./actiontypes";

export const addUserDetails = (user) => ({
  type: ADD_USER_DETAILS,
  payload: user,
});

export const clearUserDetails = () => ({
  type: CLEAR_USER_DETAILS,
});
