import { cartActions } from './../slices/cart';
import axios from "axios";
import { Cart, Product } from "../../types/types";
import { productActions } from "../slices/product";
import { AppDispatch } from "../store";
import { fetchProductData } from './product';


const url = "https://betsy-backend.onrender.com/products";

export function createOrder(cart: Cart, totalPrice: number, paymentMethod: string) {
    return async (dispatch: AppDispatch) => {
        const order = await axios.post("https://betsy-backend.onrender.com/orders/" , {"userId": cart.userId,"products": cart.products, "totalPrice": totalPrice, "paymentMethod": paymentMethod, "shippingAddress": "3995EL houten achterom 95"})
        for(let i in cart.products) {
            const result = await axios.get("https://betsy-backend.onrender.com/products/" + cart.products[i]._id)
            const product = result.data
            product.quantityLeft -= cart.products[i].quantity
            const newproduct = await axios.put("https://betsy-backend.onrender.com/products/" + cart.products[i]._id, product)
        }
        const newcart = await axios.put("https://betsy-backend.onrender.com/cart/" + cart._id, {"products": []})
        dispatch(cartActions.clearCart())
        const response = await fetch("https://betsy-backend.onrender.com/products/");
        const productData = await response.json();
        dispatch(productActions.getAllProducts(productData));
    }
} 
