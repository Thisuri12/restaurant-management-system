import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { categoryService } from "../services/category.service";
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} from "../validators/category.validator";

//Create New Category function
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = createCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const category = await categoryService.create(parsed.data);
    res.status(StatusCodes.CREATED).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

//Handles category finding requests
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = getCategorySchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsed.error.flatten(),
      });
      return;
    }

    const result = await categoryService.findAll(parsed.data);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

//Handles category update requests
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsedBody = updateCategorySchema.safeParse(req.body);

    if (!parsedBody.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsedBody.error.flatten(),
      });
      return;
    }

    const updated = await categoryService.update(id, parsedBody.data);
    if (!updated) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Category not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Category updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

//Handles category deletion requests
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const parsedData = deleteCategorySchema.safeParse({ id });

    if (!parsedData.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: parsedData.error.flatten(),
      });
      return;
    }

    const success = await categoryService.delete(parsedData.data.id);
    if (!success) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Category not found",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
