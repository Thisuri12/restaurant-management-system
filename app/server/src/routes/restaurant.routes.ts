import { Router } from "express";
import {
  createRestaurant,
  findAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller";

const router = Router();

router.post("/", createRestaurant);
router.get("/", findAllRestaurants);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
