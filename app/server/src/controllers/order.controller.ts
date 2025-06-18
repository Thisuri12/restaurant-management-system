import { Request, Response, NextFunction } from "express";
import { orderService } from "src/services/order.service";
import { StatusCodes } from "http-status-codes";
import {
  createOrderSchema,
  getOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
} from "../validators/order.validator";

//Create New Order function
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const order = await orderService.create(parsed.data);
    res.status(StatusCodes.CREATED).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

//Handles order finding requests
export const findOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = getOrderSchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const result = await orderService.findAll(parsed.data);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

//Handles order update requests
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsed = updateOrderSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const updated = await orderService.update(id, parsed.data);
    if (!updated) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Order not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Order updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

//Handles order deletion requests
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsed = deleteOrderSchema.safeParse({ id });

    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const success = await orderService.delete(parsed.data.id);
    if (!success) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Order not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
