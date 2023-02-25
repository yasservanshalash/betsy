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
        _id: "",
        avatar: "",
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
            state.user.avatar = action.payload.avatar
        },
        logOut: (state) => {
            state.user.email = ""
            state.user.isAdmin = false
            state.user.name = ""
            state.user._id = ""
            state.user.avatar = ""
            localStorage.clear()
        },
        changeName: (state, action) => {
            state.user.name = action.payload.name
        },
        changeAvatar: (state, action) => {
            state.user.avatar = action.payload.avatar
        }
    }
})

export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer