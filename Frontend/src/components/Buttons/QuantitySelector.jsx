import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../Store/cartSlice";

const QuantitySelector = (props) => {
  //const { cartItems, updateCartItemQuantity } = useContext(CartContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Get the quantity of the cart item, or use 1 as the default value if the item is not found or the cart is empty
  const cartItem = cartItems.find((item) => item.id === props.itemId);
  const cartQuantity = cartItem ? parseInt(cartItem.quantity) : 1;
  console.log(cartQuantity);

  const [quantity, setQuantity] = useState(cartQuantity);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    console.log("quantity");

    dispatch(
      updateCartItemQuantity({
        itemId: props.itemId,
        newQuantity: quantity + 1,
      })
    );
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(
        updateCartItemQuantity({
          itemId: props.itemId,
          newQuantity: quantity - 1,
        })
      );
    }
  };

  function handleChange(e) {
    const newQuantity = parseInt(e.target.value);
    dispatch(updateCartItemQuantity({ itemId: props.id, newQuantity }));

    //dispatch(updateCartItemQuantity(props.itemId, e.target.value));
  }

  return (
    <div className='flex items-center h-2/6'>
      <button
        className='bg-zinc-900 hover:bg-blue-600 text-white font-semibold rounded-l '
        onClick={decrementQuantity}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='w-5 h-5'
        >
          <path d='M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z' />
        </svg>
      </button>
      <input
        type='number'
        value={quantity}
        className='appearance-none w-10 h-5 text-xs leading-tight text-center border border-gray-300 '
        onChange={handleChange}
      />
      <button
        className='bg-zinc-900 hover:bg-blue-600 text-white font-semibold rounded-r'
        onClick={incrementQuantity}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='w-5 h-5'
        >
          <path d='M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z' />
        </svg>
      </button>
    </div>
  );
};

export default QuantitySelector;
