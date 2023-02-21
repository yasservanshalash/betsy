import { getUserController, getUsersController, createUserController, deleteUserController, updateUserController, loginWithPassword } from './../controllers/users';
import { Router } from "express";
import passport from 'passport';

const router = Router();

router.get("/", getUsersController)
router.get('/:id', getUserController)
router.post("/", createUserController)
router.delete("/:id", deleteUserController)
router.put("/:id",passport.authenticate("jwt", {session: false}), updateUserController)
router.post("/login", loginWithPassword)
export default router
