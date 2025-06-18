import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { dishService } from "src/services/dishes.service";
import {
  createDishSchema,
  updateDishSchema,
  getDishSchema,
  deleteDishSchema,
} from "../validators/dishes.validator";

//Create New Dish function
export const createDish = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = createDishSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const dish = await dishService.create(parsed.data);
    res.status(StatusCodes.CREATED).json({
      message: "Dish created successfully",
      data: dish,
    });
  } catch (error) {
    next(error);
  }
};

//Handles dish finding requests
export const getDish = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = getDishSchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const result = await dishService.findAll(parsed.data);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

//Handles dish update requests
export const updateDish = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsedBody = updateDishSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsedBody.error.flatten(),
      });
      return;
    }

    const updated = await dishService.update(id, parsedBody.data);
    if (!updated) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Dish not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Dish updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

//Handles dish deletion requests
export const deleteDish = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsedData = deleteDishSchema.safeParse({ id });

    if (!parsedData.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsedData.error.flatten(),
      });
      return;
    }

    const success = await dishService.delete(parsedData.data.id);
    if (!success) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Dish not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Dish deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
