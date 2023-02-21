import { ProductDocument } from './Product';
import mongoose, { Document } from "mongoose";

import { Schema } from "mongoose";

export type UserDocument = Document & {
    name: string;
    email: string,
    password: string;
    isAdmin: boolean;
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
    }
})

export default mongoose.model<UserDocument>("Users", UserSchema)