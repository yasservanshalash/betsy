import { cartActions } from './../slices/cart';
import { AppDispatch } from "../store";





export function fetchCart(url: string) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(url);
        const cart = await response.json();
        dispatch(cartActions.setcart(cart))
    }
} 