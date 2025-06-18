import { Request, Response, NextFunction } from "express";
import { restaurantService } from "../services/restaurant.service";
import { StatusCodes } from "http-status-codes";
import {
  createRestaurantSchema,
  getRestaurantsSchema,
  updateRestaurantSchema,
  deleteRestaurantSchema,
} from "../validators/restaurant.validator";

//Create New Restaurant function
export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = createRestaurantSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const restaurant = await restaurantService.create(parsed.data);
    res.status(StatusCodes.CREATED).json({
      message: "Restaurant created successfully",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

//Handles restaurant finding requests
export const findAllRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = getRestaurantsSchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const result = await restaurantService.findAll(parsed.data);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

//Handles restaurant update requests
export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsed = updateRestaurantSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const updated = await restaurantService.update(id, parsed.data);
    if (!updated) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Restaurant not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Restaurant updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

//Handles restaurant deletion requests
export const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsed = deleteRestaurantSchema.safeParse({ id });

    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const success = await restaurantService.delete(parsed.data.id);
    if (!success) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Restaurant not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
