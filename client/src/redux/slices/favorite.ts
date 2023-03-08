import { Product } from "./../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import { Favorites } from "../../types/types";

const localFav =
  localStorage.getItem("favorites") !== null
    ? JSON.parse(localStorage.getItem("favorites")!)
    : [];

type initialStateType = {
  favorites: {
    _id: string;
    userId: string;
    products: Product[];
  };
};
const initialState: initialStateType = {
  favorites: {
    _id: "",
    userId: "",
    products: [],
  },
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload[0];
    },
    addToFavorites: (state, action) => {
      if(state.favorites.products.find((product) => product._id === action.payload._id)) {
        return;
      } else {
        state.favorites?.products?.push(action.payload);
        localStorage.setItem(
          "favorites",
          JSON.stringify(state.favorites.products.map((item: Product) => item))
        );
      }
    },
    removeFromFavorites: (state, action) => {
        // state.favorites.products = state.favorites.products.filter((item: Product) => item._id !== action.payload.id)
        const result = state.favorites.products.findIndex(
            (product) => product.name === action.payload.name
          );
          if (result !== -1) {
            state.favorites.products.splice(result, 1);
          }
    }, addFromLocalStorage: (state) => {
        const localString = localStorage.getItem('favorites') as string;
        const localArray: Product[] = JSON.parse(localString);
        for( let item of localArray) {
          if(state.favorites.products.find((product) => product._id === item._id)) {
            return;
          } else {
            state.favorites.products.push(item)

          }
        }
    },
    
    clearFavorites: (state) => {
        state.favorites.products = [];
    }
  },
});

export const favoriteActions = favoriteSlice.actions;
const favoriteReducer = favoriteSlice.reducer;
export default favoriteReducer;
