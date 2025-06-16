import { Request, Response } from "express";
import { Category } from "@models/category.model";
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} from "src/validators/category.validator";
import { Op } from "sequelize";

//Create New Category function
export const createCategory = async (req: Request, res: Response) => {
  const parsed = createCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ errors: parsed.error.flatten() });
    return;
  }

  const { name, restaurant_id } = parsed.data;

  try {
    const category = await Category.create({
      name,
      restaurant_id,
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to create category", error: err });
  }
};

//Get a category by searching a name or get all the categories
export const getCategory = async (req: Request, res: Response) => {
  try {
    const { name, page = 1, limit = 10 } = getCategorySchema.parse(req.query);
    const offset = (page - 1) * limit;
    const whereClause = name ? { name: { [Op.like]: `%${name}%` } } : {};
    const category = await Category.findAll({
      where: whereClause,
      limit,
      offset,
    });

    res.status(200).json({
      page,
      limit,
      results: category.length,
      data: category,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories", error: err });
  }
};

//Update a restaurant by Id
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedBody = updateCategorySchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ errors: parsedBody.error.flatten() });
    return;
  }

  try {
    const category = await Category.findByPk(Number(id));
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    await category.update(parsedBody.data);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to update category", error: err });
  }
};

//Delete a restaurant by Id
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedData = deleteCategorySchema.safeParse({ id });
  if (!parsedData.success) {
    res.status(400).json({ errors: parsedData.error.flatten() });
    return;
  }
  try {
    const category = await Category.findByPk(Number(id));
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category", error: err });
  }
};
