import { configureStore} from "@reduxjs/toolkit"
import cartReducer from "./slices/cart";
import favoriteReducer from "./slices/favorite";
import productReducer from "./slices/product";
import userReducer from "./slices/user";
const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
        favorites: favoriteReducer,
        cart: cartReducer
    }
});
// export types to use later in code and export store to provide for the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;