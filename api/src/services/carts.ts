import mongoose, {Document} from "mongoose";
import Cart, {CartDocument} from "../models/Cart";

const getCarts = async (): Promise<CartDocument[] | null> => {
    return Cart.find();
}

const getCartByUserId = async(userId: string): Promise<CartDocument[] | null> => {
    return Cart.find({userId: userId})
}

const createCart = async (cart: CartDocument): Promise<CartDocument> => {
    return Cart.create(cart);
}

const deleteCart = async (id: string): Promise<CartDocument |null> => {
    return Cart.findByIdAndDelete(id)
}

const updateCart  = async (id: string, newData: Partial<CartDocument>): Promise<CartDocument |null> => {
    return Cart.findByIdAndUpdate(id, newData, { new: true});
}

export default { getCarts, getCartByUserId, createCart, deleteCart, updateCart}