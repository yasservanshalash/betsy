import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/types";

type initialStateType = {
    products: Product[]
};

const initialState = {
    products: []
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getAllProducts: (state, action) => {
            state.products = action.payload
        }
    }
})

export const productActions = productsSlice.actions;
const productReducer = productsSlice.reducer;
export default productReducer