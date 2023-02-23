import mongoose, {Document} from "mongoose";
import Favorites, {FavoritesDocument} from "../models/Favorites";

const getFavorites = async (): Promise<FavoritesDocument[] | null> => {
    return Favorites.find();
}

const getFavoritesByUserId = async(userId: string): Promise<FavoritesDocument[] | null> => {
    return Favorites.find({userId: userId})
}

const createFavorites = async (favorites: FavoritesDocument): Promise<FavoritesDocument> => {
    return Favorites.create(favorites);
}

const deleteFavorites = async (id: string): Promise<FavoritesDocument |null> => {
    return Favorites.findByIdAndDelete(id)
}

const updateFavorites  = async (id: string, newData: Partial<FavoritesDocument>): Promise<FavoritesDocument |null> => {
    return Favorites.findByIdAndUpdate(id, newData, { new: true});
}

export default { getFavoritesByUserId, createFavorites, deleteFavorites, updateFavorites, getFavorites}