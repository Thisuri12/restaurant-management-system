import { Router } from "express";
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "src/controllers/category.controller";

const router = Router();

router.post("/", createCategory);
router.get("/", getCategory);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
