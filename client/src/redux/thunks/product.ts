import { Product } from "../../types/types";
import { productActions } from "../slices/product";
import { AppDispatch } from "../store";

const url = "http://localhost:8000/products";

export function fetchProductData() {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(url);
        const productData = await response.json();
        const data = productData.forEach((product: Partial<Product>) => product.quantity = 1)
        dispatch(productActions.getAllProducts(productData));
    }
}