import { Router } from "express";
import { verifyAccessToken } from "../middleware/auth.middleware";

import {
  createRestaurant,
  findAllRestaurants,
  findRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller";

const router = Router();

router.post("/", verifyAccessToken, createRestaurant);
router.put("/:id", verifyAccessToken, updateRestaurant);
router.delete("/:id", verifyAccessToken, deleteRestaurant);

router.get("/", findAllRestaurants);
router.get("/:id", findRestaurantById);

export default router;
