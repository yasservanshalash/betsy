// product model here
import mongoose, { Document } from "mongoose";

const {Schema} = mongoose;

export type ProductDocument = Document & {
    name: string;
    image: string;
    price: number;
    rating: number;
    description: string;
}
export const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },    dateAdded: {
        type: Date,
        default: Date.now()
    },

})

export default mongoose.model<ProductDocument>("Products", ProductSchema)