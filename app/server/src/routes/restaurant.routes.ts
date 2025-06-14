import express from "express";
import {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "src/controllers/restaurant.controller";

const router = express.Router();

router.post("/", createRestaurant);
router.get("/", getRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
