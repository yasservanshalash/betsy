import { getOrderController, getOrdersController, createOrderController, updateOrderController, deleteOrderController, getOrdersByUserIdController } from './../controllers/orders';
import Router from 'express'

const router = Router();

router.get("/:id", getOrderController)
router.get("/", getOrdersController)
router.get("/:userId", getOrdersByUserIdController)
router.post("/:userId", createOrderController)
router.delete("/:id", deleteOrderController)
router.put("/:id", updateOrderController)

export default router;