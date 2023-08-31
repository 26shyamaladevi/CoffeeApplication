import axios from "axios";
import { getAuthToken, clearAuthToken } from "../AuthLogic/authTokenUtil";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
  PlusCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

import ProductUpload from "./ProductUpload";
import ListProducts from "./ListProducts";
import Profile from "../Profile";

const tabs = [
  { label: "Product", component: <ListProducts /> },
  { label: "Add Products", component: <ProductUpload action='upload' /> },
  { label: "Profile", component: <Profile /> },
];
function Admin() {
  const userDetails = useSelector((state) => state.user.payload);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    const token = getAuthToken();
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    dispatch(clearUserDetails());
    try {
      const logoutRes = await axios.post("/api/logout", null, {
        headers: headers,
      });

      if (logoutRes.status === 200) {
        // Clear the JWT from local storage
        clearAuthToken();
        navigateTo("/");
      }
    } catch (logoutErr) {
      console.log("LogoutErr");
      console.log(logoutErr);
    }
  };
  return (
    <>
      <div className='flex'>
        <Card className='h-screen w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 ml-2'>
          <div className='mb-2 p-4'>
            <h1 class='font-medium text-2xl mb-8'>
              Welcome {userDetails.firstName} {userDetails.lastName} !
            </h1>

            <Typography
              variant='h5'
              color='blue-gray'
              className='flex items-center justify-start font-bold text-2xl mx-auto my-auto text-orange-600 '
            >
              Admin Panel
            </Typography>
          </div>
          <List>
            <ListItem
              className='mb-2 hover:bg-gray-300'
              onClick={() => setActiveTab(1)}
            >
              <ListItemPrefix>
                <PlusCircleIcon className='h-5 w-5' />
              </ListItemPrefix>
              Add New Product
            </ListItem>

            <ListItem
              className='mb-2  hover:bg-gray-300'
              onClick={() => setActiveTab(0)}
            >
              <ListItemPrefix>
                <PencilSquareIcon className='h-5 w-5' />
              </ListItemPrefix>
              View & Edit Products
            </ListItem>

            <ListItem
              className='mb-2  hover:bg-gray-300'
              onClick={() => setActiveTab(2)}
            >
              <ListItemPrefix>
                <UserCircleIcon className='h-5 w-5' />
              </ListItemPrefix>
              Profile
            </ListItem>

            <ListItem
              className='mb-2  hover:bg-gray-300'
              onClick={handleLogout}
            >
              <ListItemPrefix>
                <PowerIcon className='h-5 w-5' />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
        <Card className='mx-8 container scroll-y'>
          <div className=' text-xl text-gray-800 font-bold my-8 mx-8  '>
            {activeTab === 0 ? <ListProducts /> : tabs[activeTab].component}
          </div>
        </Card>
      </div>
    </>
  );
}
export default Admin;
