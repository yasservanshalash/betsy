import { Request, Response } from "express";

import UserServices from '../services/users';
import User from "../models/User";

export const createUserController = async (req: Request, res: Response) => {
    try {
        const newUser = new User({
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
        })
        const user = await UserServices.createUser(newUser);
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
    }
}

export const getUserController =  async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await UserServices.getUser(id);
        res.status(200).json(user);
    } catch(error) {
        console.log(error);
    }  
}

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users = await UserServices.getUsers();
        res.status(200).json(users);
    } catch (error) {

    }
}

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await UserServices.deleteUser(id);
        res.status(200).json(user);
    } catch(error) {
        console.log(error);
    }
}

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const user = await UserServices.updateUser(id, newData);
        res.status(200).json(user);
    } catch(error) {
        console.log(error);
    }
}