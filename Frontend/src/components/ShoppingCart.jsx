import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "./ContextAPI/CartContext";
import QuantitySelector from "./Buttons/QuantitySelector";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCartVisibility,
  removeItemFromCart,
  clearCart,
  setCartVisibility,
} from "./Store/cartSlice";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ShoppingCart() {
  //const { cartItems, toggleCartVisibility, removeItemFromCart, clearCart } =useContext(CartContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [orderTotal, setOrderTotal] = useState(0);
  const [istoggleMinimize, setIstoggleMinimize] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Calculate the order total whenever the cartItems change
    calculateOrderTotal();
  }, [cartItems]);

  const calculateOrderTotal = () => {
    console.log(cartItems);
    const total = cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    setOrderTotal(total);
  };

  const handleClose = () => {
    dispatch(clearCart()); //  Clear Items
    dispatch(setCartVisibility(false)); // Hide the shopping cart
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const navigateTo = useNavigate();

  const handleCheckout = () => {
    dispatch(setCartVisibility(false));
    navigateTo("/checkout", {
      state: orderTotal,
      cartItems,
    });
    console.log(cartItems);
  };

  const handleMinimize = () => {
    setIstoggleMinimize(!istoggleMinimize);
  };

  return (
    <Card
      className={
        istoggleMinimize
          ? " fixed z-20 bottom-16 right-0 h-20 w-full max-w-[21rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-zinc-50 overflow-auto shadow-black"
          : "fixed bottom-3 md:top-14  right-0  h-[calc(100vh-12rem] md:h-[calc(100vh-3rem)] w-full max-w-[21rem] p-2 shadow-xl shadow-blue-gray-900/5 bg-zinc-50 overflow-auto shadow-black"
      }
    >
      <div className='mb-2 mt-4 p-2 text-gray-950 '>
        <Typography variant='h5' className=' text-center uppercase'>
          Shopping Cart
        </Typography>
        <button
          className=' text-grey-500 absolute top-3 right-8 font-semibold  hover:text-grey-700 hover:scale-125'
          onClick={handleMinimize}
        >
          {istoggleMinimize ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z'
                clipRule='evenodd'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M14.78 5.22a.75.75 0 00-1.06 0L6.5 12.44V6.75a.75.75 0 00-1.5 0v7.5c0 .414.336.75.75.75h7.5a.75.75 0 000-1.5H7.56l7.22-7.22a.75.75 0 000-1.06z'
                clipRule='evenodd'
              />
            </svg>
          )}
          {/* <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6'
          >
            <path
              fillRule='evenodd'
              d='M20.03 3.97a.75.75 0 010 1.06L6.31 18.75h9.44a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75V8.25a.75.75 0 011.5 0v9.44L18.97 3.97a.75.75 0 011.06 0z'
              clipRule='evenodd'
            />
          </svg> */}
        </button>

        <button
          onClick={handleClose}
          className='text-red-500 hover:text-red-700  hover:scale-125 absolute top-2 right-2 font-semibold'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6'
          >
            <path
              fillRule='evenodd'
              d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      <div className='grid grid-flow-row mb-4'>
        <div className='grid grid-cols-3 content-start'>
          <h3 className='font-semibold text-gray-900 columns-[10rem] text-sm uppercase flex items-center justify-center'>
            Product
          </h3>
          <h2 className='font-semibold   text-center col-span-1 text-gray-900 text-sm uppercase flex items-center justify-center '>
            Quantity
          </h2>
          <h2 className='font-semibold text-center col-span-1 pl-0 text-gray-900 text-sm uppercase flex items-center justify-center  '>
            Price
          </h2>
        </div>
      </div>
      <List className='grid grid-flow-row gap-4 '>
        {cartItems.map((item) => (
          <ListItem
            key={item.id}
            ripple={false}
            className='py-1 pr-1 text-gray-600 '
          >
            <div className='grid grid-cols-3 gap-16'>
              <div className='col-span-1'>
                <Typography variant='h1' className=' text-sm w-2/5 pl-2 '>
                  {item.pName}
                </Typography>
              </div>
              <div className='col-span-1 flex items-center'>
                <Typography variant='h4' className='text-xs w-1/3 '>
                  <QuantitySelector itemId={item.id} quantity={item.quantity} />
                </Typography>
              </div>
              <div className='col-span-1 flex items-center'>
                <Typography
                  variant='h4'
                  className=' text-xs w-1/6 pl-2 flex items-center'
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </div>
            </div>

            <ListItemSuffix>
              <TrashIcon
                className='h-5 w-5 text-gray-800 hover:text-red-600'
                onClick={() => handleRemoveItem(item.id)}
              />
            </ListItemSuffix>
          </ListItem>
        ))}
      </List>
      <div className='border-t border-gray-400 px-4 py-6 sm:px-6 mt-8'>
        <div class='flex justify-between text-base font-medium text-gray-900'>
          <p>Order total</p>
          <p>$ {orderTotal.toFixed(2)}</p>
        </div>
        <div class='mt-6'>
          <div
            class='flex items-center justify-center rounded-md border border-transparent bg-btnprimary px-4 py-2 text-base font-medium text-white shadow-sm hover:scale-110'
            onClick={handleCheckout}
            style={{ cursor: "pointer" }}
          >
            Proceed to Checkout
          </div>
        </div>
      </div>
    </Card>
  );
}
