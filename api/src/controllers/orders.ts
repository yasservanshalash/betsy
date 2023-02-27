import { Request, Response } from "express";

import OrderServices from "../services/orders";
import Order from '../models/Order'

export const getOrderController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const order = await OrderServices.getOrder(id);
        res.status(200).json(order);

    } catch(error) {
        res.json(error);
    }
}

export const getOrdersController = async (req: Request, res: Response) => {
    try {
        const orders = await OrderServices.getOrders();
        res.status(200).json(orders);
    } catch(error) {
        res.json(error);
    }
}

export const getOrdersByUserIdController = async( req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const orders = await OrderServices.getOrdersByUserId(userId);
        res.status(200).json(orders);
    } catch(error) {
        res.json(error);
    }
}

export const createOrderController = async (req: Request, res: Response) => {
    try {
        const newOrder = new Order({
            "dateOfOrder": req.body.dateOfOrder,
            "userId": req.params.userId,
            "products": req.body.products,
            "totalPrice": req.body.totalPrice,
            "paymentMethod": req.body.paymentMethod
        });
        const order = await OrderServices.createOrder(newOrder);
        res.status(200).json(order);

    } catch(error) {
        res.json(error);
    }
}



export const deleteOrderController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const order = await OrderServices.deleteOrder(id);
        res.status(200).json(order);

    } catch(error) {
        res.json(error);
    }
}

export const updateOrderController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const order = await OrderServices.updateOrder(id);
        res.status(200).json(order);

    } catch(error) {
        res.json(error);
    }
}