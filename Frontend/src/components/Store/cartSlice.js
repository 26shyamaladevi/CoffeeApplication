// cartReducer.js
// const initialState = {
//   isCartVisible: false,
//   cartItems: [],
//   order: [],
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "TOGGLE_CART_VISIBILITY":
//       return {
//         ...state,
//         isCartVisible: !state.isCartVisible,
//       };
//     case "SET_CART_VISIBILITY":
//       return {
//         ...state,
//         isCartVisible: action.payload,
//       };
//     case "ADD_TO_CART":
//       return {
//         ...state,
//         cartItems: [...state.cartItems, action.payload],
//       };
//     case "UPDATE_CART_ITEM_QUANTITY":
//       return {
//         ...state,
//         cartItems: state.cartItems.map((item) =>
//           item.id === action.payload.itemId
//             ? { ...item, quantity: action.payload.newQuantity }
//             : item
//         ),
//       };
//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((item) => item.id !== action.payload),
//       };
//     case "CLEAR_CART":
//       return {
//         ...state,
//         cartItems: [],
//       };
//     case "ADD_ORDER":
//       return {
//         ...state,
//         order: [...state.order, action.payload],
//       };
//     default:
//       return state;
//   }
// };

// export default cartReducer;
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  order: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartVisibility: (state, action) => {
      state.isCartVisible = action.payload;
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      console.log("FROM CARTSLICE " + action.payload);

      const { itemId, newQuantity } = action.payload;
      console.log(itemId + " " + newQuantity);

      state.cartItems = state.cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: () => {
      return initialState;
    },
    addOrder: (state, action) => {
      state.order.push(action.payload);
    },
  },
});

export const {
  toggleCartVisibility,
  setCartVisibility,
  addToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
  addOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
