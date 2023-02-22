import { configureStore} from "@reduxjs/toolkit"
import productReducer from "./slices/product";
import userReducer from "./slices/userSlice";
const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
    }
});
// export types to use later in code and export store to provide for the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;