import { favoriteActions } from './../slices/favorite';
import { AppDispatch } from "../store";
import { Favorites, Product } from '../../types/types';
import axios from 'axios';





export function fetchFavorites(url: string) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(url);
        const favorites = await response.json();
        dispatch(favoriteActions.setFavorites(favorites))
    }
} 

export function addToFavoritesThunk(userId: string, favorites: Favorites, product: Product) {
    return async (dispatch: AppDispatch) => {
        const products = favorites.products.concat([product])
        const result = await axios.put("https://betsy-backend.onrender.com/favorites/" + favorites._id , {"products": products})
    }
} 


export function removeFromFavoritesThunk(userId: string, favorites: Favorites, product: Product) {
    return async (dispatch: AppDispatch) => {
        const products = favorites.products.filter((item) => item.name !== product.name)
        const result = await axios.put("https://betsy-backend.onrender.com/favorites/" + favorites._id , {"products": products})
    }
} 
