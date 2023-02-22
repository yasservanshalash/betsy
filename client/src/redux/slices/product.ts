import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/types";

type initialStateType = {
    products: Product[]
};

const initialState = {
    Products: [],
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getAllProducts: (state, action) => {
            state.Products = action.payload
        }
    }
})

export const productActions = productsSlice.actions;
const productReducer = productsSlice.reducer;
export default productReducer