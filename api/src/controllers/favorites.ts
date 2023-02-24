import { Request, Response } from "express";

import FavoritesServices from "../services/favorites";
import Favorites from '../models/Favorites'

export const getFavoritesController = async( req: Request, res: Response) => {
    try{ 
        const favorites = await FavoritesServices.getFavorites();
        res.status(200).json(favorites);
    } catch(error) {
       res.json(error);
    }
}

export const getFavoritesByUserIdController = async( req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const favorites = await FavoritesServices.getFavoritesByUserId(userId);
        res.status(200).json(favorites);
    } catch(error) {
       res.json(error);
    }
}

export const createFavoritesController = async (req: Request, res: Response) => {
    try {
        const newFavorites = new Favorites({
            "userId": req.body.userId,
            "products": req.body.products,
        });
        const favorites = await FavoritesServices.createFavorites(newFavorites);
        res.status(200).json(favorites);
    } catch(error) {
       res.json(error);
    }
}

export const deleteFavoritesController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const favorites = await FavoritesServices.deleteFavorites(id);
        res.status(200).json(favorites);

    } catch(error) {
       res.json(error);
    }
}

export const updateFavoritesController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        const favorites = await FavoritesServices.updateFavorites(id, newData);
        res.status(200).json(favorites);
    } catch(error) {
       res.json(error);
    }
}
