import { Category } from "../models/category.model";
import { z } from "zod";
import { Op } from "sequelize";
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} from "../validators/category.validator";

// Type definitions derived from Zod validation schemas.
type CreateCategoryData = z.infer<typeof createCategorySchema>;
type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
type GetCategoryParams = z.infer<typeof getCategorySchema>;

export const categoryService = {
  //Creates a new category
  async create(data: CreateCategoryData) {
    return await Category.create(data);
  },

  //Get a category by searching a name or get all the categories with pagination
  async findAll(params: GetCategoryParams) {
    const { skip, limit, name, restaurant_id } = params;
    const where: any = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (restaurant_id) where.restaurant_id = restaurant_id;

    const { count, rows } = await Category.findAndCountAll({
      where,
      limit,
      offset: skip,
      order: [["created_at", "DESC"]],
    });

    return {
      data: rows,
      pagination: {
        skip,
        limit,
        total: count,
        pages: Math.ceil(count / limit),
      },
    };
  },

  //Updates an existing category
  async update(id: string | number, data: UpdateCategoryData) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update(data);
  },

  //Deletes a category record
  async delete(id: string | number) {
    const category = await Category.findByPk(id);
    if (!category) return false;
    await category.destroy();
    return true;
  },
};
