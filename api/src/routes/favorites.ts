import Router from 'express'
import { createFavoritesController, deleteFavoritesController, getFavoritesByUserIdController, getFavoritesController, updateFavoritesController } from '../controllers/favorites';

const router = Router();

router.get("/", getFavoritesController)
router.get("/:userId", getFavoritesByUserIdController)
router.post("/", createFavoritesController)
router.delete("/:id", deleteFavoritesController)
router.put("/:id", updateFavoritesController)


export default router;

