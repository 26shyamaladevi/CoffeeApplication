import React from "react";
import { CartProvider } from "./CartContext";
import { UserProvider } from "./UserContext";
import { combineComponents } from "./combineComponents";

const providers = [CartProvider, UserProvider];
const AppProvider = combineComponents(...providers);
export default AppProvider;
