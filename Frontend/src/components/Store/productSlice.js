import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductDetails: (state, action) => {
      return {
        ...state,
        type: "ADD_PRODUCT_DETAILS",
        payload: action.payload,
      };
    },
  },
});
export const { addProductDetails } = productSlice.actions;
export default productSlice.reducer;
