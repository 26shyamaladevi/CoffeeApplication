import { Outlet, Navigate } from "react-router-dom";
import { getAuthToken } from "../AuthLogic/authTokenUtil";

const ProtectedRoutes = () => {
  const token = getAuthToken();
  let auth = { token: false };

  if (token != null) {
    auth = { token: true };
  }
  return auth.token ? <Outlet /> : <Navigate to='/'></Navigate>;
};

export default ProtectedRoutes;
