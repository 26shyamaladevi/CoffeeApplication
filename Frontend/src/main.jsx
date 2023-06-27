import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/home' element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  </>
);
