import { Router } from "express";
import {
  createRating,
  getRating,
  updateRating,
  deleteRating,
} from "src/controllers/rating.controller";

const router = Router();

router.post("/", createRating);
router.get("/", getRating);
router.put("/:id", updateRating);
router.delete("/:id", deleteRating);

export default router;
