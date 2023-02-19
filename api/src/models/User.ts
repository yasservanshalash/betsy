import { ProductDocument } from './Product';
import mongoose, { Document } from "mongoose";

import { Schema } from "mongoose";

export type UserDocument = Document & {
    name: string;
    email: string,
    password: string;
    wishlist: [],
    cart: [],
    orders: []
}

const UserSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        unique: [true, "email should be unique"],
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    wishList: {
        type: [{}],
        default: []
    },
    cart: {
        type: [{}],
        default: []
    },
    orders: {
        type: [{}],
        default: []
    },
})

export default mongoose.model<UserDocument>("Users", UserSchema)