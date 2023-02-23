import { createCartController, deleteCartController, getCartByUserIdController, updateCartController } from './../controllers/carts';
import Router from 'express'
import { getCartsController } from '../controllers/carts';

const router = Router();

router.get("/", getCartsController)
router.get("/:userId", getCartByUserIdController)
router.post("/", createCartController)
router.delete("/:id", deleteCartController)
router.put("/:id", updateCartController)


export default router;

