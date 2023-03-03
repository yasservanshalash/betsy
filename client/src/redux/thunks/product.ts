import axios from "axios";
import { Product } from "../../types/types";
import { productActions } from "../slices/product";
import { AppDispatch } from "../store";

const url = "https://betsy-backend.onrender.com/products";

export function fetchProductData() {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(url);
        const productData = await response.json();
        dispatch(productActions.getAllProducts(productData));
        console.log(productData)
    }
}

export function addProductThunk(product: Product) {
    return async (dispatch: AppDispatch) => {
        const result = await axios.post(url, product)
        console.log(result.data);
    }
}
