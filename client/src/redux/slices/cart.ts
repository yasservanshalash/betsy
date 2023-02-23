import { Product } from "./../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../types/types";

const localCart =
  localStorage.getItem("cart") !== null
    ? JSON.parse(localStorage.getItem("cart")!)
    : [];

type initialStateType = {
  cart: {
    _id: string;
    userId: string;
    products: Product[];
  };
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
      if(state.cart.products.find((product) => product._id === action.payload._id)) {
        return;
      } else {
        state.cart?.products?.push(action.payload);
        localStorage.setItem(
          "cart",
          JSON.stringify(state.cart.products.map((item: Product) => item))
        );
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
      console.log(state.cart.products)
  },
    clearCart: (state) => {
        state.cart.products = [];
    }
  },
});

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
