import { cartActions } from './../slices/cart';
import axios from "axios";
import { Cart, Product } from "../../types/types";
import { productActions } from "../slices/product";
import { AppDispatch } from "../store";
import { fetchProductData } from './product';


const url = "http://localhost:8000/products";

export function createOrder(cart: Cart, totalPrice: number, paymentMethod: string) {
    return async (dispatch: AppDispatch) => {
        const order = await axios.post("http://localhost:8000/orders/" , {"userId": cart.userId,"products": cart.products, "totalPrice": totalPrice, "paymentMethod": paymentMethod, "shippingAddress": "3995EL houten achterom 95"})
        for(let i in cart.products) {
            const result = await axios.get("http://localhost:8000/products/" + cart.products[i]._id)
            const product = result.data
            console.log(product, "product from create order redux function")
            product.quantityLeft -= cart.products[i].quantity
            console.log("product left: " + product.quantity)
            const newproduct = await axios.put("http://localhost:8000/products/" + cart.products[i]._id, product)
            console.log(newproduct, "new product is")
        }
        const newcart = await axios.put("http://localhost:8000/cart/" + cart._id, {"products": []})
        console.log(order.data, "order")
        console.log(newcart, "newCart")
        dispatch(cartActions.clearCart())
        const response = await fetch("http://localhost:8000/products/");
        const productData = await response.json();
        dispatch(productActions.getAllProducts(productData));
        console.log(productData)
    }
} 
