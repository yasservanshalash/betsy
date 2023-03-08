import { Product } from './../../types/types';
import { cartActions } from './../slices/cart';
import { AppDispatch } from "../store";
import { Cart } from '../../types/types';
import axios from 'axios';





export function fetchCart(url: string) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(url);
        const cart = await response.json();
        dispatch(cartActions.setcart(cart))
    }
} 


export function addToCartThunk(userId: string, cart: Cart, product: Product) {
    return async (dispatch: AppDispatch) => {
        const products = cart.products.concat([product])
        const result = await axios.put("http://localhost:8000/cart/" + cart._id , {"products": products})
    }
} 


export function removeFromCartThunk(userId: string, cart: Cart, product: Product) {
    return async (dispatch: AppDispatch) => {
        const products = cart.products.filter((item) => item.name !== product.name)
        const result = await axios.put("http://localhost:8000/cart/" + cart._id , {"products": products})
    }
} 

export function updateCart(cart: Cart) {
    return async (dispatch: AppDispatch) => {
        const result = await axios.put(`http://localhost:8000/cart/${cart._id}`  , {"products": cart.products})
    }
} 


export function updateCartFromLocalStorage(cart: Cart, products: []) {
    return async (dispatch: AppDispatch) => {
        const result = await axios.put(`http://localhost:8000/cart/${cart._id}`  , {"products": products})
    }
} 