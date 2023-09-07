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
