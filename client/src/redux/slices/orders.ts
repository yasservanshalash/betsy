import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types/types";

type initialStateType = {
    orders: Order[]
};

const initialState = {
    orders: []
}

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        getAllOrders: (state, action) => {
            state.orders = action.payload
        },
    }
})

export const orderActions = orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default orderReducer