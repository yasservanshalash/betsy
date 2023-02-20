import mongoose, { Document } from "mongoose";
import { ProductDocument, ProductSchema } from './Product';
import User from "./User";


const {Schema} = mongoose;

export type OrderDocument = Document & {
    dateOfOrder: Date;
    userId: string;
    products: [];
}

const OrderSchema = new Schema({
    dateOfOrder: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    products: [{type: ProductSchema}] //    products: [{type: Schema.Types.ObjectId, ref: Product}]
})

export default mongoose.model<OrderDocument>("Orders", OrderSchema)