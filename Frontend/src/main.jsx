import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/User/WelcomePage.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import ProtectedRoutes from "./components/ProtectedRouteLogic/ProtectedRoutes";
import CheckOut from "./components/CheckOut";
import UserOrders from "./components/User/UserOrders";
import Profile from "./components/Profile";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./components/Store/store";
import Admin from "./components/Admin/Admin";
import UnAuthorized from "./components/UnAuthorized";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route element={<WelcomePage />} path='/welcome' exact />
            <Route element={<Profile />} path='/profile'></Route>
            <Route element={<UserOrders />} path='/orders'></Route>
            <Route element={<CheckOut />} path='/checkout'></Route>
            <Route element={<Admin />} path='/admin/dashboard' />

            <Route element={<UnAuthorized />} path='/unauthorized' />
          </Route>
          <Route path='/' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
