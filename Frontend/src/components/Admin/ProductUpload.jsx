import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { getAuthToken } from "../AuthLogic/authTokenUtil";

function ProductUpload() {
  const navigateTo = useNavigate();
  const [state, setState] = useState({
    productName: "",
    price: "",
    description: "",
    imagedata: null,
  });

  const [file, setFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleFileUpload = (event) => {
    console.log(event);
    const newFile = event.target.files[0];
    if (newFile) {
      setPreviewUrl(URL.createObjectURL(newFile));
      setFile(newFile);
      setState({ ...state, imagedata: newFile });
    }
  };
  const handleDelete = () => {
    setPreviewUrl(null);
    setState({ ...state, imagedata: null });
  };
  const handleCancel = () => {
    setState({
      productName: "",
      price: "",
      description: "",
      imagedata: "",
    });
  };
  const handleSave = async (event) => {
    event.preventDefault();
    console.log(state);
    const formData = new FormData();
    formData.append("productName", state.productName);
    formData.append("price", state.price);
    formData.append("description", state.description);
    formData.append("image", file);
    try {
      const token = getAuthToken();
      let headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const response = await axios.post(`/api/products/add`, formData, {
        headers: headers,
      });
      console.log(response);
      alert(response.data);
    } catch (err) {
      alert("Please Login in Again");
      setTimeout(() => {
        navigateTo("/");
      }, 1000);
    }
    setState({
      productName: "",
      price: "",
      description: "",
      imagedata: "",
    });
    setPreviewUrl(null);
  };
  return (
    <>
      <div className=' relative max-w-3xl mx-auto  pb-4 '>
        <div>
          <Typography className='font-bold mb-8 lg:text-2xl  text-orange-600'>
            Add New Product
          </Typography>
        </div>

        <form className='w-full'>
          <div className='  space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <Typography className='flex items-center justify-center font-bold mb-8 lg:text-2xl  text-gray-900'>
                Product Details
              </Typography>
              <div className='border-b border-gray-900/10 pb-12'>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='product-name'
                      className='block text-base font-semibold leading-6 text-gray-900'
                    >
                      Product Name
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='productName'
                        id='product-name'
                        value={state.productName}
                        autoComplete='given-name'
                        className='font-normal block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='product-price'
                      className=' block text-base font-semibold leading-6 text-gray-900'
                    >
                      Product Price
                    </label>
                    <div className='mt-2'>
                      <input
                        type='number'
                        name='price'
                        id='price'
                        value={state.price}
                        autoComplete='family-name'
                        className='font-normal block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none'
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='col-span-full'>
                  <label
                    htmlFor='about'
                    className='block text-base font-semibold leading-6 text-gray-900'
                  >
                    Product Description
                  </label>
                  <div className='mt-2'>
                    <textarea
                      id='description'
                      name='description'
                      rows='3'
                      value={state.description}
                      className='font-normal block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <p className='mt-3 text-sm leading-6 text-gray-600'>
                    Write a few sentences about the product.
                  </p>
                </div>

                <div className='col-span-full'>
                  <label
                    htmlFor='cover-photo'
                    className='block text-base font-semibold leading-6 text-gray-900'
                  >
                    Product Image
                  </label>
                  <div className='relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 '>
                    {previewUrl ? (
                      <>
                        <div className=' absolute top-2  right-0 '>
                          <button onClick={handleDelete}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-6 h-6 text-gray-950  hover:text-red-500 hover:scale-110 mx-2'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                              />
                            </svg>
                          </button>
                        </div>
                        <div className='relative'>
                          <img
                            src={previewUrl}
                            alt='Selected File'
                            className='mx-auto abosolute inset-0 text-gray-300'
                          />
                        </div>
                      </>
                    ) : (
                      <div className='text-center'>
                        <svg
                          className='mx-auto h-12 w-12 text-gray-300'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            fillRule='evenodd'
                            d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                          <label
                            htmlFor='file-upload'
                            className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                          >
                            <span>Upload a file</span>
                            <input
                              id='file-upload'
                              name='file-upload'
                              type='file'
                              className='sr-only'
                              onChange={handleFileUpload}
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='text-xs leading-5 text-gray-600'>
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <button
              type='button'
              className='leading-6 text-gray-900 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100'
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-md bg-btnprimary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-btnprimary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default ProductUpload;
