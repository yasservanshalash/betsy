import { Request, Response } from "express";

import OrderServices from "../services/orders";
import Order from '../models/Order'

export const getOrderController = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const order = OrderServices.getOrder(id);
        res.status(200).json(order);

    } catch(error) {
        console.log(error);
    }
}

export const getOrdersController = (req: Request, res: Response) => {
    try {
        const orders = OrderServices.getOrders();
        res.status(200).json(orders);

    } catch(error) {
        console.log(error);
    }
}

export const createOrderController = (req: Request, res: Response) => {
    try {
        const newOrder = req.body;
        const order = OrderServices.createOrder(newOrder);
        res.status(200).json(order);

    } catch(error) {
        console.log(error);
    }
}

export const deleteOrderController = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const order = OrderServices.deleteOrder(id);
        res.status(200).json(order);

    } catch(error) {
        console.log(error);
    }
}

export const updateOrderController = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const order = OrderServices.updateOrder(id);
        res.status(200).json(order);

    } catch(error) {
        console.log(error);
    }
}