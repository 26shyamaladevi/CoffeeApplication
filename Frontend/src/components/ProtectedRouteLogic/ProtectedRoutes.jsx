import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getAuthToken, clearAuthToken } from "../AuthLogic/authTokenUtil";
import { useSelector } from "react-redux";
import { clearUserDetails } from "../Store/userSlice";

const ProtectedRoutes = () => {
  const token = getAuthToken();

  const location = useLocation();

  const isAuthenticated = token !== null;

  if (!isAuthenticated) {
    clearAuthToken();
    clearUserDetails();
    return <Navigate to='/' />;
  }

  // Check if the user is trying to access the admin section

  const userDetails = useSelector((state) => state.user.payload);
  const userRole = userDetails.role.rname;

  const isAdminDashboard = location.pathname === "/admin/dashboard";
  const isUnAuthorized = location.pathname === "/unauthorized";

  //If user tries to acess admin page

  if (isAdminDashboard && userRole !== "ADMIN") {
    return <Navigate to='/unauthorized' />;
  }

  //If admin tries to acess other than admin page
  else if (!isAdminDashboard && !isUnAuthorized && userRole === "ADMIN") {
    console.log(location.pathname + " " + userRole);

    return <Navigate to='/unauthorized' />;
  }

  // If neither of the above conditions is met, render the appropriate route
  else {
    return <Outlet />;
  }
};

export default ProtectedRoutes;
