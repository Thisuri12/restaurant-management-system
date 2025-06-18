import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ratingService } from "src/services/rating.service";
import {
  createRatingSchema,
  updateRatingSchema,
  getRatingSchema,
  deleteRatingSchema,
} from "../validators/rating.validator";

//Create New Rating function
export const createRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = createRatingSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const rating = await ratingService.create(parsed.data);
    res.status(StatusCodes.CREATED).json({
      message: "Rating created successfully",
      data: rating,
    });
  } catch (error) {
    next(error);
  }
};

//Handles rating finding requests by dish_id
export const getRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = getRatingSchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const result = await ratingService.findAll(parsed.data);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

//Handles rating update requests
export const updateRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsedBody = updateRatingSchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsedBody.error.flatten(),
      });
      return;
    }

    const updated = await ratingService.update(id, parsedBody.data);
    if (!updated) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Rating not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Rating updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

//Handles rating deletion requests
export const deleteRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsedData = deleteRatingSchema.safeParse({ id });

    if (!parsedData.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsedData.error.flatten(),
      });
      return;
    }

    const success = await ratingService.delete(parsedData.data.id);
    if (!success) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Rating not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Rating deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
