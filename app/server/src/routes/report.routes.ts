import express from "express";
import {
  getSales,
  getTopItems,
  getAverageOrder,
} from "../controllers/report.controller";

const router = express.Router();

router.get("/sales", getSales);
router.get("/top-items", getTopItems);
router.get("/average-order", getAverageOrder);

export default router;
