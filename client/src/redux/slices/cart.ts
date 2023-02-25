import { Product } from "./../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../types/types";

const localCart =
  localStorage.getItem("cart") !== null
    ? JSON.parse(localStorage.getItem("cart")!)
    : [];

type initialStateType = {
  cart: {
    _id: string,
    userId: string,
    products: Product[]
  }
};
const initialState: initialStateType = {
  cart: {
    _id: "",
    userId: "",
    products: [],
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setcart: (state, action) => {
        state.cart = action.payload[0]
    },
    addTocart: (state, action) => {
      if(state.cart?.products?.find((product) => product.name === action.payload.name)) {
        return;
      } else {
        state.cart?.products?.push(action.payload);
      }
    },
    removeFromcart: (state, action) => {
        // state.cart.products = state.cart.products.filter((item: Product) => item._id !== action.payload.id)
        const result = state.cart.products.findIndex(
            (product) => product.name === action.payload.name
          );
          if (result !== -1) {
            state.cart.products.splice(result, 1);
          }
    },addFromLocalStorage: (state) => {
      const localString = localStorage.getItem('cart') as string;
      const localArray: Product[] = JSON.parse(localString);
      for( let item of localArray) {
        if(state.cart.products.find((product) => product._id === item._id)) {
          return;
        } else {
          state.cart.products.push(item)

        }
      }
  },
  changeAmount: (state, action) => {
    const product = state.cart.products.find((product) => product.name === action.payload[0].name);
    if(product) {
        product.quantity = action.payload[1]
    }
  },
    clearCart: (state) => {
        state.cart.products = [];
    }
  },
});

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
