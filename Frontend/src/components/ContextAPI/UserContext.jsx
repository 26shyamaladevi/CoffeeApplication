import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);

  const addUserDetails = (user) => {
    setUserDetails(user);
  };

  const clearUserDetails = () => {
    setUserDetails(null);
  };

  return (
    <UserContext.Provider
      value={{
        userDetails,
        addUserDetails,
        clearUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
