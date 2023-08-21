import Header from "./User/Header";
import {
  Breadcrumbs,
  Typography,
  Button,
  ButtonGroup,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import PasswordInput from "./Buttons/PasswordInput";
import axios from "axios";
import { getAuthToken } from "./AuthLogic/authTokenUtil";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userDetails = useSelector((state) => state.user.payload);
  const role = userDetails.role.rname;
  const navigateTo = useNavigate();
  const [isEdit, setisEdit] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);

    console.log(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    if (newPassword === e.target.value) {
      setPasswordsMatch(true);
      setErrorMessage("");
      setConfirmPassword(e.target.value);
    } else {
      setPasswordsMatch(false);
      setErrorMessage("New password and Confirm password didn't match!");
    }
    setConfirmPassword(e.target.value);
  };

  const handleEdit = () => {
    setisEdit(true);
  };
  const handleSave = async () => {
    let token = getAuthToken();
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    const password = currentPassword;
    try {
      const passMatchResponse = await axios.get(
        `api/user/${String(userDetails.emailId)}/${password}`,
        {
          headers: headers,
        }
      );
      if (passMatchResponse.status == 200) {
        try {
          headers = {
            Authorization: `Bearer ${token}`,
          };
          const passwordChangeRes = await axios.put(
            `api/user/update/${String(userDetails.emailId)}/${confirmPassword}`,
            null,
            { headers: headers }
          );
          alert(passwordChangeRes.data);
        } catch (chnageErr) {
          console.log("Error changing password: ", changeErr);
        }
      }
    } catch (fetchErr) {
      alert(fetchErr.data);
      console.log("Error fetching pasword match: ", fetchErr);
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setisEdit(false);
  };

  const handleCancel = () => {
    setisEdit(false);
  };

  const handleDeleteMyAcc = async () => {
    let token = getAuthToken();
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const deleteAccRes = await axios.delete(
        `/api/user/delete/${String(userDetails.userId)}`,
        { headers: headers }
      );
      console.log(deleteAccRes.data);
      navigateTo("/");
    } catch (deleteAccErr) {
      console.log(deleteAccErr);
    }
  };

  return (
    <>
      {role === "USER" ? <Header /> : <></>}
      <div className='max-w-3xl md:mx-auto md:my-auto mx-4 pb-4'>
        {role === "USER" ? (
          <Breadcrumbs className=' w-auto px-0 py-4 '>
            <a href='/welcome' className=' opacity-70 pr-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
              </svg>
            </a>

            <a href='#' className='pl-1'>
              Profile
            </a>
          </Breadcrumbs>
        ) : (
          <></>
        )}
        <div>
          <Typography className='font-bold mb-8 lg:text-2xl  text-orange-600'>
            Manage Your Profile
          </Typography>
          <div>
            <div className='grid min-h-[140px] w-full overflow-x-scroll rounded-lg p-6 lg:overflow-visible place-items-center bg-gray-100 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className=' relative inline-block h-16 w-16 rounded-lg object-cover object-center'
              >
                <path
                  fillRule='evenodd'
                  d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                  clipRule='evenodd'
                />
              </svg>

              <div className='w-full md:w-7/12 pt-5 px-4 mb-8 mx-auto text-center'>
                <div className='text-sm text-gray-700 py-1'>
                  <span className='text-gray font-medium'>
                    {userDetails.firstName} {userDetails.lastName}
                  </span>
                </div>
              </div>
            </div>
            <div className='border-2 p-4 '>
              <div className='px-4 sm:px-0 flex flex-row justify-between'>
                <h2 className='lg:text-lg text-base font-semibold leading-7 text-gray-900'>
                  User Information
                </h2>
                <div type='button' className='hover:cursor-pointer'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-6 h-6 '
                    onClick={handleEdit}
                  >
                    <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z' />
                    <path d='M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z' />
                  </svg>
                </div>
              </div>
              <div className=' px-4 py-4 mt-6 border-t border-gray-300'>
                <dl className='   divide-y divide-gray-300'>
                  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className=' text-sm font-medium leading-6 text-gray-900'>
                      First Name
                    </dt>
                    <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {userDetails.firstName}
                    </dd>
                  </div>
                  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-medium leading-6 text-gray-900'>
                      Last Name
                    </dt>
                    <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {userDetails.lastName}
                    </dd>
                  </div>

                  <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                    <dt className='text-sm font-medium leading-6 text-gray-900'>
                      Email address
                    </dt>
                    <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                      {userDetails.emailId}
                    </dd>
                  </div>

                  {isEdit ? (
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Change Password
                        <div>
                          <span className='flex-shrink-0 text-gray-400'>
                            Update your password associated with your account.
                          </span>
                        </div>
                      </dt>

                      <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        <ul
                          role='list'
                          className='divide-y divide-gray-100 rounded-md border border-gray-200'
                        >
                          <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'>
                            <div className='flex w-0 flex-1 items-center'>
                              <div className='ml-4 flex flex-col min-w-0 flex-1 gap-2'>
                                <span className='truncate font-medium'>
                                  Current Password
                                </span>

                                <PasswordInput
                                  label='current Password'
                                  value={currentPassword}
                                  onInputChange={handleCurrentPasswordChange}
                                />
                              </div>
                            </div>
                          </li>
                          <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'>
                            <div className='flex w-0 flex-1 items-center'>
                              <div className='ml-4 flex flex-col min-w-0 flex-1 gap-2'>
                                <span className='truncate font-medium'>
                                  New Password
                                </span>

                                <PasswordInput
                                  label='New Password'
                                  value={newPassword}
                                  onInputChange={handleNewPasswordChange}
                                />
                              </div>
                            </div>
                          </li>
                          <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'>
                            <div className='flex w-0 flex-1 items-center'>
                              <div className='ml-4 flex flex-col min-w-0 flex-1 gap-2'>
                                <span className='truncate font-medium'>
                                  Confirm Password
                                </span>

                                <PasswordInput
                                  label='Confirm Password'
                                  value={confirmPassword}
                                  onInputChange={handleConfirmPasswordChange}
                                />
                                {!passwordsMatch && (
                                  <p className='text-red-500 text-xs'>
                                    {errorMessage}
                                  </p>
                                )}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  ) : (
                    <></>
                  )}
                  {isEdit ? (
                    <div className='flex place-items-center justify-center p-4 '>
                      <ButtonGroup className='gap-2'>
                        <Button
                          className='  mx-auto my-auto  rounded-md border border-transparent bg-btnprimary px-4 py-2 text-base font-medium text-white shadow-sm hover:scale-110 '
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                        <Button
                          className='  mx-auto my-auto  rounded-md border border-transparent bg-btnprimary px-4 py-2 text-base font-medium text-white shadow-sm hover:scale-110 '
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      </ButtonGroup>
                    </div>
                  ) : (
                    <></>
                  )}
                  {!isEdit ? (
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Delete my acoount
                        <div>
                          <span className='flex-shrink-0 text-gray-400 justify-center'>
                            No longer want to use our service? You can delete
                            your account here. This action is not reversible.
                            All information related to this account will be
                            deleted permanently.
                          </span>
                        </div>
                      </dt>
                      <dd className=' mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        <Button
                          className='text-white bg-red-500 hover:bg-red-500/80 normal-case'
                          onClick={handleDeleteMyAcc}
                        >
                          Yes, delete my account
                        </Button>
                      </dd>
                    </div>
                  ) : (
                    <></>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
