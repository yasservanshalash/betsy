import axios from "axios";
import { Cart, Product } from "../../types/types";
import { productActions } from "../slices/product";
import { AppDispatch } from "../store";



export function createOrder(cart: Cart, totalPrice: number, paymentMethod: string) {
    return async (dispatch: AppDispatch) => {
        const result = await axios.post("http://localhost:8000/cart/" + cart.userId , {"products": cart.products, "totalPrice": totalPrice, "paymentMethod": paymentMethod, "shippingAddress": "P sherman 42 wallaby way Sidney"})
        const newCart = await axios.put("http://localhost:8000/cart/" + cart._id, {"products": []})
        console.log(result.data, newCart)
    }
} 
