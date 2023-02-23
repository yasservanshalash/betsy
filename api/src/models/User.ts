import { ProductDocument } from './Product';
import mongoose, { Document } from "mongoose";

import { Schema } from "mongoose";

export type UserDocument = Document & {
    name: string;
    email: string,
    password: string;
    isAdmin: boolean;
    avatar: string;
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
    isAdmin: {
        type: Boolean,
        default: false,
    }, 
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
})

export default mongoose.model<UserDocument>("Users", UserSchema)