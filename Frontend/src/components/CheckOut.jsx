import Header from "./User/Header";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Breadcrumbs } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { getAuthToken } from "./AuthLogic/authTokenUtil";
import { useSelector } from "react-redux";

function CheckOut() {
  const location = useLocation();
  console.log(location);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const userDetails = useSelector((state) => state.user.payload);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const navigateTo = useNavigate();

  const [order, setOrder] = useState({
    customer: {
      userId: userDetails.userId,
    },
    orderItems: cartItems.map((item) => ({
      pId: item.id,
      quantity: item.quantity,
      price: (item.price * item.quantity).toFixed(2),
    })),
    totalPrice: location.state.toFixed(2),
    paymentMethod: "",
  });

  const getPaymentMethods = async () => {
    const token = getAuthToken();
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.get("api/payments", { headers: headers });
      setPaymentMethods(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrder = async () => {
    console.log(order);
    const token = getAuthToken();
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      console.log(order);

      const res = await axios.post("api/orders/add", order, {
        headers: headers,
      });
      console.log("order res");
      console.log(res);
      alert("Order placed successfully!");
      setTimeout(() => {
        navigateTo("/orders");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    navigateTo("/welcome");
  };
  useEffect(() => {
    getPaymentMethods();
  }, []);

  return (
    <div>
      <Header />
      <div className='p-6 top-8 ml-5'>
        <Breadcrumbs className=' w-auto'>
          <a href='/welcome' className=' opacity-70 mr-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
            </svg>
          </a>

          <a className='ml-1'>Checkout</a>
        </Breadcrumbs>
      </div>

      <div className='bg-white rounded-lg shadow-md   p-6  top-8 container mx-auto my-auto'>
        <div className=' grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-12'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold mb-4'>Payment Information</h2>
            <label
              className='text-gray-700 font-bold mb-3'
              htmlFor='PaymentMethod'
            >
              Payment Method
            </label>
            <select
              id='paymentMethod'
              type='text'
              className=' border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full mb-4'
              onChange={(e) =>
                setOrder({ ...order, paymentMethod: e.target.value })
              }
            >
              <option value='' disabled selected>
                Select payment method
              </option>
              {paymentMethods.map((method) => (
                <option value={method.paymentMethod} key={method.id}>
                  {method.paymentMethod}
                </option>
              ))}
            </select>
            {/* Render the input field only if "Credit Card" or "Debit Card" is selected */}
            {order.paymentMethod === "Credit Card" ||
            order.paymentMethod === "Debit Card" ? (
              <>
                <div>
                  <label
                    className='block text-gray-700 font-bold '
                    htmlFor='CardNumber'
                  >
                    Card Number
                  </label>
                  <input
                    type='text'
                    placeholder='Enter Card Number'
                    className=' border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full mb-4'
                  ></input>
                </div>
                <div>
                  <label
                    className='block text-gray-700 font-bold '
                    htmlFor='NameOnCard'
                  >
                    Name on Card
                  </label>
                  <input
                    type='text'
                    placeholder='Enter the name on Card'
                    className=' border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full mb-4'
                  ></input>
                </div>
              </>
            ) : null}
          </div>

          <div className='mb-6'>
            <h2 className='text-2xl font-bold  mb-4'>Order List</h2>

            <div className=' border rounded-lg p-4 border-neutral-900 '>
              <div className='grid grid-flow-row mb-4 '>
                <div className='grid grid-cols-3 place-items-center  font-semibold  text-blue-600  '>
                  <h3>Product</h3>
                  <h3>Quantity</h3>
                  <h3>Price</h3>
                </div>
              </div>

              <ol ripple={false} className='list-inside list-decimal'>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className='grid grid-cols-3 place-items-center justify-center mx-auto my-auto'
                  >
                    <span>{item.pName}</span>
                    <span>{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ol>

              <div className='border-t border-b border-gray-400 py-4 px-4 sm:px-6 mt-8'>
                <div class='  flex text-base  sm:font-medium text-gray-900'>
                  <p className='ml-auto '>Order total: </p>
                  <p className=' ml-2 mr-5'>$ {location.state.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 flex '>
          <Button
            className=' ml-auto mr-2 items-center justify-center rounded-md border border-transparent bg-btnprimary px-4 py-2 text-base font-medium text-white shadow-sm hover:scale-110 '
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className='  mr-auto ml-2 items-center justify-center rounded-md border border-transparent bg-btnprimary px-4 py-2 text-base font-medium text-white shadow-sm hover:scale-110 '
            onClick={handleOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
export default CheckOut;
