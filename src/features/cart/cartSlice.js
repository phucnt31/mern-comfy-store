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

const getCartFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("cart")) || defaultState;

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
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
      cartSlice.caseReducers.calculateTotals(state);
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
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, editItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
