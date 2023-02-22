import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";

type initialStateType = {
    user: User
};

const initialState = {
    user: {
        name: "",
        isAdmin: false,
        email: "",
        _id: ""
    },
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.user.email = action.payload.email
            state.user.isAdmin = action.payload.isAdmin
            state.user.name = action.payload.name
            state.user._id = action.payload._id
        },
        logOut: (state) => {
            state.user.email = ""
            state.user.isAdmin = false
            state.user.name = ""
            state.user._id = ""
            localStorage.clear()
        }
    }
})

export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer