import { useState, useEffect } from "react";
import coffeeGif from ".././assets/coffee_gif.gif";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    e.preventDefault();

    try {
      const response = axios.post("/api/log-in", {
        emailId: formInput.email,
        password: formInput.password,
      });
      // Handle successful login, e.g., redirect to home page

      response.then((value) => console.log(value.data));
    } catch (error) {
      // Handle login error
      console.log(error);
    }

    alert(formInput.email);
  };

  const handleInputEmail = (e) => {
    //console.log(e.target.value);
    setFormInput({ ...formInput, email: e.target.value });
  };
  const handleInputPass = (e) => {
    //console.log(e.target.value);
    setFormInput({ ...formInput, password: e.target.value });
  };
  useEffect(() => {
    console.log(formInput);
  }, [formInput]);

  const navigateTo = useNavigate();

  return (
    <div className='bg-gray-100 relative flex flex-col justify-center min-h-screen overflow-hidden '>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm w-full p-6  bg-white rounded-md ring-2 ring-amber-600 lg:max-w-xl'>
        <img
          className='mx-auto '
          src={coffeeGif}
          alt='coffeeLogo'
          width='100px'
          height='100px'
        ></img>
        <h2 className='text-xl font-semibold text-center text-amber-700decoration-orange-400'>
          Sign in to your account
        </h2>
        <form>
          <div className='mb-2 content-center'>
            <label
              htmlFor='email'
              className='block text-sm font-semibold text-gray-800'
            >
              Email:
            </label>
            <input
              type='email'
              value={formInput.email}
              autoComplete='email'
              onChange={handleInputEmail}
              className='block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6'
            />
          </div>
          <div className='mb-2'>
            <label
              htmlFor='password'
              className='block text-sm font-semibold text-gray-800'
            >
              Password:
            </label>
            <input
              type='password'
              value={formInput.password}
              autoComplete='password'
              onChange={handleInputPass}
              className='block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6'
            />
          </div>
          <a href='#' className='text-xs text-amber-600 hover:underline'>
            {" "}
            Forgot Password ?
          </a>
          <div className='mt-6'>
            <button
              onClick={handleForm}
              className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-amber-700 rounded-md hover:bg-amber-600 focus:bg-amber-300'
            >
              Login
            </button>
          </div>
        </form>
        <p className='mt-8 text-xs font-light text-center text-gray-700'>
          Don't have an account ?
          <b
            className='font-medium text-amber-600 hover:underline cursor-pointer'
            onClick={() => navigateTo("/signUp")}
          >
            Sign up
          </b>
        </p>
      </div>
    </div>
  );
}
export default Login;
