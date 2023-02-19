import { getOrderController, getOrdersController, createOrderController, updateOrderController, deleteOrderController } from './../controllers/orders';
import Router from 'express'

const router = Router();

router.get("/:id", getOrderController)
router.get("/", getOrdersController)
router.post("/", createOrderController)
router.delete("/:id", deleteOrderController)
router.put("/:id", updateOrderController)

export default router;