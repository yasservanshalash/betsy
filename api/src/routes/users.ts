import { getUserController, getUsersController, createUserController, deleteUserController, updateUserController } from './../controllers/users';
import { Router } from "express";

const router = Router();

router.get("/", getUsersController)
router.get('/:id', getUserController)
router.post("/", createUserController)
router.delete("/:id", deleteUserController)
router.put("/:id", updateUserController)

export default router
