import { createFavoritesController } from './favorites';
import { Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from "dotenv";

import UserServices from '../services/users';
import User from "../models/User";

import FavoritesServices from "../services/favorites"
import Favorites from '../models/Favorites';

import CartServices from "../services/carts"
import Cart from "../models/Cart";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET as string;

export const createUserController = async (req: Request, res: Response) => {    
    try {
        const user = await UserServices.findUserByEmail(req.body.email);
        if(!user) {
            const newUser = new User({
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
            })
            const user = await UserServices.createUser(newUser);

            const newFavorites = new Favorites({
                "userId": user._id, "products": []
            })

            const newCart = new Cart({
                "userId": user._id, "products": []
            })

            

            const favorites = await FavoritesServices.createFavorites(newFavorites)
            const cart = await CartServices.createCart(newCart)

            res.status(201).json({
                "user": user,
                "favorites": favorites,
                "cart": cart
            })
        } else {
            res.status(400).json({message: "User already exists"})
        }

    } catch (error) {
        console.log(error);
        res.json({message: "User already exists"})
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

export const loginWithPassword = async (req: Request, res: Response) => {
    try {
        const user = await UserServices.findUserByEmail(req.body.email)
        if(!user) {
            res.json({message: `coudn't find user with email ${req.body.email}`})
            return;
        }
        const token = jwt.sign(
            {email: user.email, _id: user._id}, JWT_SECRET, {expiresIn: "1hr"})
            res.json({user, token})
    } catch(error) {
        console.log(error);
    }
}