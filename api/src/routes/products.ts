import { Router } from "express";
import { createProductController, deleteProductController, getProductsController, getProductController, updateProductsController } from "../controllers/products";

const router = Router();

router.get("/", getProductsController)
router.get("/:id", getProductController)
router.post("/", createProductController)
router.delete("/:id", deleteProductController)
router.put("/:id", updateProductsController)

export default router