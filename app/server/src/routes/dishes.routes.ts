import { Router } from "express";
import {
  createDish,
  getDish,
  updateDish,
  deleteDish,
} from "src/controllers/dishes.controller";

const router = Router();

router.post("/", createDish);
router.get("/", getDish);
router.put("/:id", updateDish);
router.delete("/:id", deleteDish);

export default router;
