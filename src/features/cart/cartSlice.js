import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      console.log(state.cartItems);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.amount * product.price;
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;
      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Item added to cart");
    },
    clearCart: (state) => {
      console.log(state);
    },
    removeItem: (state, action) => {
      console.log(action.payload);
    },
    editItem: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { addItem, clearCart, editItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
