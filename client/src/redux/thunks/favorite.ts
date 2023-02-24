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
        console.log(favorites)
        console.log("new favorites", favorites)
        console.log("favorites._id", favorites._id)
        console.log("favorites products", favorites.products)
        console.log("product", product)
        const products = favorites.products.concat([product])
        console.log("new products", products)
        const result = await axios.put("http://localhost:8000/favorites/" + favorites._id , {"products": products})
        console.log(result.data)

    }
} 


export function removeFromFavoritesThunk(userId: string, favorites: Favorites, product: Product) {
    return async (dispatch: AppDispatch) => {
        const products = favorites.products.filter((item) => item.name !== product.name)
        console.log(products)
        const result = await axios.put("http://localhost:8000/favorites/" + favorites._id , {"products": products})
        console.log(result.data)

    }
} 
