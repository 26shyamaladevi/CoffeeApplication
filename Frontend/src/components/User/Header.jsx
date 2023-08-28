import CoffeeLogo from "../../assets/Coffee.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUserDetails } from "../Store/userSlice";
import { clearCart } from "../Store/cartSlice";
import axios from "axios";
import { getAuthToken, clearAuthToken } from "../AuthLogic/authTokenUtil";

function Header() {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleHomeNav = () => {
    navigateTo("/welcome");
  };
  const handkeProfileNav = () => {
    navigateTo("/profile");
  };
  const handleOrderNav = () => {
    navigateTo("/orders");
  };
  const handleLogout = async () => {
    const token = getAuthToken();
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    dispatch(clearUserDetails());
    dispatch(clearCart());
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
    <header className='bg-yellow-600/75' ç>
      <nav className='z-20 flex items-center justify-between flex-wrap  p-6 pb-2 border-b-2 '>
        <div className='flex items-center flex-shrink-0  mr-6'>
          <img
            src={CoffeeLogo}
            className='fill-current h-12 w-12 mr-2'
            width='54'
            height='54'
            viewBox='0 0 54 54'
            alt='Logo'
          ></img>

          <span className='text-gray-700 font-bold font-mono font-style-italic  text-xl tracking-tight'>
            Coffee App Application
          </span>
        </div>
        <div className='block lg:hidden'>
          <button className='flex items-center px-3 py-2 border rounded text-black border-gray-400 hover:border-black'>
            <svg
              className='fill-current h-3 w-3'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
        </div>
        <div className='hidden md:block w-full  flex-grow  justify-start lg:flex lg:items-center lg:justify-center lg:w-auto'>
          <div className=' text-md font-semibold lg:flex-grow  '>
            <a
              href='#responsive-header'
              className=' block mt-4 lg:inline-block lg:mt-0 font-base font-semibold  text-white  hover:text-btnprimary mr-4 hover:scale-110 px-4 	'
              onClick={handleHomeNav}
            >
              Home
            </a>
            <a
              href='#responsive-header'
              className=' block mt-4 lg:inline-block lg:mt-0 font-base font-semibold text-white hover:text-btnprimary mr-4 hover:scale-110 px-4 	'
              onClick={handkeProfileNav}
            >
              Profile
            </a>
            <a
              href='#responsive-header'
              className=' block mt-4 lg:inline-block lg:mt-0 font-base font-medium text-white hover:text-btnprimary  mr-4 hover:scale-110 px-4 		'
              onClick={handleOrderNav}
            >
              Orders
            </a>
          </div>
          <div>
            <a
              href='#'
              className='z-20 hidden md:inline-block  font-md font-semibold  text-sm px-4 py-2 leading-none border rounded font-base  border-black hover:border-transparent hover:bg-btnprimary hover:text-white hover:scale-110 mt-4 lg:mt-0'
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        </div>
        {/* <div>
          <a
            href='#'
            className='hidden md:inline-block  font-md font-semibold  text-sm px-4 py-2 leading-none border rounded font-base  border-black hover:border-transparent hover:bg-btnprimary hover:text-white hover:scale-110 mt-4 lg:mt-0'
            onClick={handleLogout}
          >
            Logout
          </a>
        </div> */}
      </nav>
    </header>
  );
}
export default Header;
