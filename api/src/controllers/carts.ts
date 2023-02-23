import { Request, Response } from "express";

import CartServices from "../services/carts";
import Cart from '../models/Cart'

export const getCartsController = async( req: Request, res: Response) => {
    try{ 
        const carts = await CartServices.getCarts();
        res.status(200).json(carts);
    } catch(error) {
        console.log(error);
    }
}

export const getCartByUserIdController = async( req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const cart = await CartServices.getCartByUserId(userId);
        res.status(200).json(cart);
    } catch(error) {
        console.log(error);
    }
}

export const createCartController = async (req: Request, res: Response) => {
    try {
        const newCart = new Cart({
            "userId": req.body.userId,
            "products": req.body.products,
        });
        const cart = await CartServices.createCart(newCart);
        res.status(200).json(cart);
    } catch(error) {
        console.log(error);
    }
}

export const deleteCartController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const cart = await CartServices.deleteCart(id);
        res.status(200).json(cart);

    } catch(error) {
        console.log(error);
    }
}

export const updateCartController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const cart = await CartServices.updateCart(id, newData);
        res.status(200).json(cart);
    } catch(error) {
        console.log(error);
    }
}
