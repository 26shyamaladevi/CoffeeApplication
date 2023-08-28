import { useNavigate } from "react-router-dom";
import AccessDenied from "../assets/AccessDenied.png";

function UnAuthorized() {
  const goBack = useNavigate();

  const handleBack = () => {
    console.log(goBack);
    goBack(-2);
  };

  return (
    <div className='lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col lg:flex-row md:gap-28 gap-16'>
      <div className='xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0'>
        <div className='relative'>
          <div className='absolute'>
            <div className='flex flex-row items-center justify-center gap-4'>
              <div>
                <img src={AccessDenied} />
              </div>
              <div>
                <h1 className='my-2 text-gray-800 font-bold text-2xl'>
                  Unauthorized Access
                </h1>
                <p className='my-2 text-gray-800'>
                  Oops, You do not have permission to access this page.
                </p>
                <button
                  className='sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50'
                  onClick={handleBack}
                >
                  Please go back!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UnAuthorized;
