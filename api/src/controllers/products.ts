import { Request, Response } from "express";

import ProductServices from "../services/products";
import Product from "../models/Product";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product({
      "name": req.body.name,
      "description": req.body.description,
      "price": req.body.price,
      "rating": req.body.rating,
      "image": req.body.image
    });

    const product = await ProductServices.createProduct(newProduct);

    res.json(product);
  } catch (error) {
    (error);
  }
};


export const getProductsController = async (req: Request, res: Response) => {
    try {
        const products = await ProductServices.getProducts();
        res.status(200).json(products)
    } catch(error) {
        res.json(error);
    }
}

export const getProductController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const product = await ProductServices.getProduct(id);
        res.json(product)
    } catch(error) {
        res.json(error);
    }
}

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const product = await ProductServices.deleteProduct(id);
        res.json(product)
    } catch (error) {
        res.json(error);
    }
}

export const updateProductsController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const newData = req.body
      const product = await ProductServices.updateProducts(id, newData)
      res.json(product);
    } catch (error) {
        res.json(error);
    }
}
