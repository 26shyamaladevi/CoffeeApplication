import { useState, useEffect } from "react";
import coffeeGif from ".././assets/coffee_gif.gif";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function SignUp() {
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const navigateTo = useNavigate();

  const handleForm = (e) => {
    const userDetails = {
      firstName: formInput.firstName,
      lastName: formInput.lastName,
      password: formInput.password,
      emailId: formInput.email,
      role: {
        rname: formInput.role,
      },
    };
    axios
      .post("/api/users/add", userDetails)
      .then(function (response) {
        if (response.status == 200) {
          console.log(response);
          navigateTo("/");
        }
      })
      .catch(function (error) {
        alert(error.response.data);
      });
    e.preventDefault();
    setFormInput({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };

  useEffect(() => {
    console.log(formInput);
  }, [formInput]);

  return (
    <>
      <div className=' relative flex flex-col justify-center min-h-screen overflow-hidden '>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm w-full p-6  bg-lemon rounded-md ring-2 ring-black  lg:max-w-xl'>
          <img
            className='mx-auto '
            src={coffeeGif}
            alt='coffeeLogo'
            width='100px'
            height='100px'
          ></img>
          <h2 className='text-xl font-semibold text-center text-amber-700decoration-orange-400'>
            Sign Up to create your account
          </h2>
          <p className='mt-3 text-xs font-light text-center text-gray-700'>
            Already have an account ?
            <b
              className='font-medium text-amber-600 hover:underline cursor-pointer'
              onClick={() => navigateTo("/")}
            >
              Sign in
            </b>
          </p>
          <form>
            <div className='mb-2 content-center'>
              <div className='mb-2'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-semibold text-gray-800'
                >
                  First Name:
                </label>
                <input
                  type='text'
                  value={formInput.firstName}
                  autoComplete='userName'
                  onChange={(e) =>
                    setFormInput({ ...formInput, firstName: e.target.value })
                  }
                  className='block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-black ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6'
                ></input>
              </div>
              <div className='mb-2'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-semibold text-gray-800'
                >
                  Last Name:
                </label>
                <input
                  type='text'
                  value={formInput.lastName}
                  autoComplete='userName'
                  onChange={(e) =>
                    setFormInput({ ...formInput, lastName: e.target.value })
                  }
                  className='block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6'
                ></input>
              </div>
              <div className='mb-2'>
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
                  onChange={(e) =>
                    setFormInput({ ...formInput, email: e.target.value })
                  }
                  className='block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6'
                />
              </div>
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
                onChange={(e) =>
                  setFormInput({ ...formInput, password: e.target.value })
                }
                className='block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6'
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='role'
                className='block text-sm font-semibold text-gray-800'
              >
                Role:
              </label>
              <select
                onChange={(e) =>
                  setFormInput({ ...formInput, role: e.target.value })
                }
                className='block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6'
              >
                <option value=''>Choose a Role</option>
                <option value='USER'>User</option>
                <option value='ADMIN'>Admin</option>
              </select>
            </div>

            <div className='mb-2'>
              <button
                onClick={(e) => handleForm(e)}
                className='mt-8 w-full px-4 py-2 tracking-wide font-semibold transition-colors duration-200 transform bg-btnprimary rounded-md hover:bg-btnhover'
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default SignUp;
