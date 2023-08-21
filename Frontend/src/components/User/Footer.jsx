import { Typography } from "@material-tailwind/react";

export default function SimpleFooter() {
  return (
    // <footer className='flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-8 border-t border-blue-gray-50 py-2 text-center md:justify-between'>
    //   <Typography color='blue-gray' className='font-normal'>
    //     &copy; 2023 Coffee Application
    //   </Typography>
    //   <ul className='flex flex-wrap items-center gap-y-2 gap-x-8'>
    //     <li>
    //       <Typography
    //         as='a'
    //         href='#'
    //         color='blue-gray'
    //         className='font-normal transition-colors hover:text-blue-500 focus:text-blue-500'
    //       >
    //         About Us
    //       </Typography>
    //     </li>
    //     <li>
    //       <Typography
    //         as='a'
    //         href='#'
    //         color='blue-gray'
    //         className='font-normal transition-colors hover:text-blue-500 focus:text-blue-500'
    //       >
    //         License
    //       </Typography>
    //     </li>

    //     <li>
    //       <Typography
    //         as='a'
    //         href='#'
    //         color='blue-gray'
    //         className='font-normal transition-colors hover:text-blue-500 focus:text-blue-500'
    //       >
    //         Contact Us
    //       </Typography>
    //     </li>
    //   </ul>
    // </footer>

    <footer className='  fixed  align-text-top inset-x-0 bottom-0 left-0 z-20 w-full  bg-white border-t border-gray-200 shadow flex items-center  md:p-4 dark:bg-gray-950 dark:border-gray-600 md:h-12 justify-center '>
      <span className='text-xs sm:text-sm text-white text-center sm:text-center dark:text-slate-200 '>
        © 2023{" "}
        <a href='' className='hover:underline'>
          Coffee App Application™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
