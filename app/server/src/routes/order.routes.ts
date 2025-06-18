import { Router } from "express";
import {
  createOrder,
  findOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/", findOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
