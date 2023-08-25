import { useState, useEffect, useContext } from "react";
import coffeeGif from ".././assets/coffee_gif.gif";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthToken, setAuthToken } from "./AuthLogic/authTokenUtil";
import { UserContext } from "./ContextAPI/UserContext";
import Alert from "./Alert/Alert";

import { useDispatch } from "react-redux";
import { addUserDetails } from "./Store/userSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Login() {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const [alertMessage, setAlertMessage] = useState(null);
  //const { userDetails, addUserDetails } = useContext(UserContext);

  const dispatch = useDispatch();

  const handleAddUser = (userData) => {
    dispatch(addUserDetails(userData));
  };

  //Function to Handle Form
  const handleForm = async (e) => {
    e.preventDefault();

    //get JWT
    const jwt = getAuthToken();

    let headers = {};
    if (jwt != null && jwt != "null") {
      headers = {
        Authorization: `Bearer ${jwt}`,
      };
      console.log("headers: " + headers);
    }

    try {
      const response = await axios.post(
        "/api/log-in",
        {
          emailId: formInput.email,
          password: formInput.password,
        },
        { headers: headers }
      );

      // Handling successful login
      setAlertMessage({ type: "success", text: "Login successful!" });
      console.log(response);
      setAuthToken(response.data.token);
      setTimeout(() => {
        handleAddUser(response.data);
        const role = response.data.role.rname;
        console.log("Role" + role);
        //Navigate to Admin if the role is ADMIN
        if (role === "ADMIN") {
          navigateTo("/admin/dashboard");
        }
        //Navigate to Welcome Page if User
        else {
          navigateTo("/welcome");
        }
      }, 2000);
    } catch (error) {
      // Handle login error
      const errMsg = error.response.data.message;

      setAlertMessage({ type: "error", text: errMsg.toString() });
    }
  };

  const handleInputEmail = (e) => {
    setFormInput({ ...formInput, email: e.target.value });
  };

  const handleInputPass = (e) => {
    setFormInput({ ...formInput, password: e.target.value });
  };

  useEffect(() => {
    console.log(formInput);
  }, [formInput]);

  const navigateTo = useNavigate();

  return (
    <div className=' relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm w-full p-6 bg-lemon rounded-md ring-2 ring-black lg:max-w-xl'>
        <img
          className='mx-auto '
          src={coffeeGif}
          alt='coffeeLogo'
          width='100px'
          height='100px'
        ></img>
        <h2 className='text-xl font-bold text-center  '>
          Sign in to your account
        </h2>
        {alertMessage && (
          <Alert
            message={alertMessage.text}
            type={alertMessage.type}
            onClose={() => setAlertMessage(null)}
          />
        )}

        <form>
          <div className='mb-2 content-center'>
            <label htmlFor='email' className='block text-sm font-semibold'>
              Email:
            </label>
            <input
              type='email'
              value={formInput.email}
              autoComplete='email'
              onChange={handleInputEmail}
              className='block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-black ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber sm:text-sm sm:leading-6'
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='password' className='block text-sm font-semibold'>
              Password:
            </label>
            <input
              type='password'
              value={formInput.password}
              autoComplete='password'
              onChange={handleInputPass}
              className='block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber sm:text-sm sm:leading-6'
            />
          </div>
          {/* <a href='#' className='text-xs text-amber hover:underline'>
            {" "}
            Forgot Password ?
          </a> */}
          <div className='mt-6'>
            <button
              onClick={handleForm}
              className='w-full px-4 py-2 tracking-wide font-semibold transition-colors duration-200 transform bg-btnprimary rounded-md hover:bg-btnhover '
            >
              Login
            </button>
          </div>
        </form>
        <p className='mt-8 text-xs font-medium text-center '>
          Don't have an account?
          <b
            className='font-bold font-xl hover:underline cursor-pointer hover:decoration-yellow'
            onClick={() => navigateTo("/signUp")}
          >
            {" "}
            Sign up
          </b>
        </p>
      </div>
    </div>
  );
}
export default Login;
