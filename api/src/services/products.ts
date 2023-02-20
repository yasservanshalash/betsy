import { ProductDocument } from "../models/Product";
import Product from "../models/Product";

const createProduct = async (product: ProductDocument): Promise<ProductDocument> => {
    return product.save();
}

const getProducts = async (): Promise<ProductDocument[] | null> => {
    return Product.find();
}

const getProduct = async(id: string): Promise<ProductDocument | null> => {
    return Product.findById(id);
}

const deleteProduct = async (id: string): Promise<ProductDocument | null> => {
    return Product.findByIdAndDelete(id);
}

const updateProducts = async (id: string, newData: Partial<ProductDocument>): Promise<ProductDocument | null> => {
    return Product.findByIdAndUpdate(id, newData, {new: true});
}

export default { createProduct, getProducts, getProduct, deleteProduct, updateProducts }