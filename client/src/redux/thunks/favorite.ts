import { favoriteActions } from './../slices/favorite';
import { AppDispatch } from "../store";





export function fetchFavorites(url: string) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(url);
        const favorites = await response.json();
        dispatch(favoriteActions.setFavorites(favorites))
    }
} 