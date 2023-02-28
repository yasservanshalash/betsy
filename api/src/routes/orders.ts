import { getOrderController, getOrdersController, createOrderController, updateOrderController, deleteOrderController, getOrdersByUserIdController } from './../controllers/orders';
import Router from 'express'

const router = Router();

router.get("/order/:id", getOrderController)
router.get("/", getOrdersController)
router.get("/:userId", getOrdersByUserIdController)
router.post("/", createOrderController)
router.delete("/:id", deleteOrderController)
router.put("/:id", updateOrderController)

export default router;