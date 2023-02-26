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

// export function addToCartThunk(userId: string, cartId: string, product: Product) {
//     return async (dispatch: AppDispatch) => {
//         const response = await fetch("http://localhost:8000/cart/" + userId);
//         const cart = await response.json();
//         console.log(cart, "cart from thunk");
//         const cartObj = cart[0]
//         cartObj.products.concat(Array(product))
//         console.log(cartObj, "new cart from thunk");
//         const result = await axios.put("http://localhost:8000/cart/" + cartId, {"products": [cartObj.products]})
//         console.log(result)
//         dispatch(cartActions.setcart(result.data))
//     }
// } 

export function addToCartThunk(userId: string, cart: Cart, product: Product) {
    return async (dispatch: AppDispatch) => {
        console.log(cart)
        console.log("new cart", cart)
        console.log("cart._id", cart._id)
        console.log("cart products", cart.products)
        console.log("product", product)
        const products = cart.products.concat([product])
        console.log("new products", products)
        const result = await axios.put("http://localhost:8000/cart/" + cart._id , {"products": products})
        console.log(result.data)

    }
} 


export function removeFromCartThunk(userId: string, cart: Cart, product: Product) {
    return async (dispatch: AppDispatch) => {
        const products = cart.products.filter((item) => item.name !== product.name)
        console.log(products)
        const result = await axios.put("http://localhost:8000/cart/" + cart._id , {"products": products})
        console.log(result.data)
    }
} 

export function updateCart(cart: Cart) {
    return async (dispatch: AppDispatch) => {

        const result = await axios.put(`http://localhost:8000/cart/${cart._id}`  , {"products": cart.products})
        console.log(result.data, "cart updated")
    }
} 
