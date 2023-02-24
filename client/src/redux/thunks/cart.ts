import { cartActions } from './../slices/cart';
import { AppDispatch } from "../store";
import { Product } from '../../types/types';
import axios from 'axios';





export function fetchCart(url: string) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(url);
        const cart = await response.json();
        dispatch(cartActions.setcart(cart))
    }
} 

export function updateCart(userId: string, cartId: string, product: Product) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch("http://localhost:8000/cart/" + userId);
        const cart = await response.json();
        console.log(cart, "cart from thunk");
        cart[0].products.push(product);
        console.log(cart, "new cart from thunk");
        // axios.put("http://localhost:8000/cart/" + id, newCart).then((response) => dispatch(cartActions.setcart(response.data.cart)))
        const result = await axios.put("http://localhost:8000/cart/" + cartId, {products: cart[0].products})
        console.log(result)
        dispatch(cartActions.setcart(result.data))
    }
} 

export function removeFromCart(userId: string, cartId: string, product: Product) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch("http://localhost:8000/cart/" + userId);
        const cart = await response.json();
        console.log(cart, "cart from thunk");
        const newCart = cart[0].products.filter((item: Product) => item._id !== product._id)
        console.log(cart, "new cart from thunk");
        // axios.put("http://localhost:8000/cart/" + id, newCart).then((response) => dispatch(cartActions.setcart(response.data.cart)))
        const result = await axios.put("http://localhost:8000/cart/" + cartId, {products: newCart})
        console.log(result)
        dispatch(cartActions.setcart(result.data))
    }
} 


// axios.get("http://localhost:8000/cart/" + cart._id).then(response => response.data)
// axios.put("http://localhost:8000/cart/" + cart._id)

// axios.post('http://localhost:8000/users/login', values).then((response) => {
