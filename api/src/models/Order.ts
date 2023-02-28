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
    products: [{type: ProductSchema}], //    products: [{type: Schema.Types.ObjectId, ref: Product}]
    shippingAddress: {
        type: String,
        default: "P sherman 42 wallaby way Sidney"
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String,
        default: ""
    }
})

export default mongoose.model<OrderDocument>("Orders", OrderSchema)