import { cartActions } from './../slices/cart';
import axios from "axios";
import { Cart, Product, User } from "../../types/types";
import { productActions } from "../slices/product";
import { AppDispatch } from "../store";
import { fetchProductData } from './product';
import { orderActions } from '../slices/orders';


export function createOrder(cart: Cart, totalPrice: number, paymentMethod: string) {
    return async (dispatch: AppDispatch) => {
        const order = await axios.post("http://localhost:8000/orders/" , {"userId": cart.userId,"products": cart.products, "totalPrice": totalPrice, "paymentMethod": paymentMethod, "shippingAddress": "3995EL houten achterom 95"})
        for(let i in cart.products) {
            const result = await axios.get("http://localhost:8000/products/" + cart.products[i]._id)
            const product = result.data
            product.quantityLeft -= cart.products[i].quantity
            const newproduct = await axios.put("http://localhost:8000/products/" + cart.products[i]._id, product)
        }
        const newcart = await axios.put("http://localhost:8000/cart/" + cart._id, {"products": []})
        dispatch(cartActions.clearCart())
        const response = await fetch("http://localhost:8000/products/");
        const productData = await response.json();
        dispatch(productActions.getAllProducts(productData));
        
    }
} 


export function fetchOrders(userId: string) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch("http://localhost:8000/orders/" + userId);
        const orders = await response.json();
        dispatch(orderActions.getAllOrders(orders));
    }
}