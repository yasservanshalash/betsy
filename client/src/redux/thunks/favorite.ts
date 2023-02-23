import { favoriteActions } from './../slices/favorite';
import { AppDispatch } from "../store";

const localFavorites = (JSON.parse(localStorage.getItem('favorites') as string))

export function fetchFavorites(url: string) {
    return async (dispatch: AppDispatch) => {
        const response = await fetch(url);
        const favorites = await response.json();
        const newFavorites = {
            _id: favorites._id,
            userId: favorites.userId,
            products: favorites.products.concat(localFavorites)
        }
        dispatch(favoriteActions.setFavorites(newFavorites));
        console.log(favorites)
    }
}