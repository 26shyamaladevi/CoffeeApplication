import jwt_decode from "jwt-decode";
import { Cookies } from "react-cookie";

//Get JWT TOKEN
export const getAuthToken = () => {
  const cookies = new Cookies();
  const token = cookies.get("jwt_auth");

  // Token does not exist
  if (!token) {
    return null;
  }

  let decodedToken = jwt_decode(token);
  if (isTokenExpired(decodedToken)) {
    console.log("Token expired.");
    return null;
  } else {
    console.log("Valid token");
    return token;
  }
};

//SET JWT TOKEN
export const setAuthToken = (token) => {
  const cookies = new Cookies();
  cookies.set("jwt_auth", token);
};

//check JWT exp is in seconds
export const isTokenExpired = (decodedToken) => {
  let currentDate = new Date();
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return true;
  } else {
    return false;
  }
};

// Function to clear JWT token cookie
export const clearAuthToken = () => {
  const cookies = new Cookies();
  cookies.remove("jwt_auth");
};
