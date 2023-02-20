import mongoose, {Document} from "mongoose";
import Order, { OrderDocument } from "../models/Order";

const getOrder = async (id: string): Promise<OrderDocument | null> => {
    return Order.findById(id)
}

const getOrders = async (): Promise<OrderDocument[] | null> => {
    return Order.find()
}

const getOrdersByUserId = async(userId: string): Promise<OrderDocument[] | null> => {
    return Order.find({userId: userId})
}

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
    return Order.create(order);
}

const deleteOrder = async (id: string): Promise<OrderDocument |null> => {
    return Order.findByIdAndDelete(id)
}

const updateOrder  = async (id: string): Promise<OrderDocument |null> => {
    return Order.findByIdAndUpdate(id)
}

export default { getOrder, getOrders, createOrder, deleteOrder, updateOrder, getOrdersByUserId}