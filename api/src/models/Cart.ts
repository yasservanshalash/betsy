import mongoose, { Document } from "mongoose";
import { ProductDocument, ProductSchema } from './Product';
import User from "./User";


const {Schema} = mongoose;

export type CartDocument = Document & {
    userId: string;
    products: [];
}

const CartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    products: [{type: ProductSchema}] //    products: [{type: Schema.Types.ObjectId, ref: Product}]
})

export default mongoose.model<CartDocument>("Cart", CartSchema)