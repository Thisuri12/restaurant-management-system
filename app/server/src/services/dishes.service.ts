import { Dish } from "@models/dish.model";
import { z } from "zod";
import { Op } from "sequelize";
import {
  createDishSchema,
  updateDishSchema,
  getDishSchema,
} from "../validators/dishes.validator";

// Type definitions derived from Zod validation schemas.
type CreateDishData = z.infer<typeof createDishSchema>;
type UpdateDishData = z.infer<typeof updateDishSchema>;
type GetDishParams = z.infer<typeof getDishSchema>;

export const dishService = {
  //Creates a new dish
  async create(data: CreateDishData) {
    return await Dish.create(data);
  },

  //Get a dish by searching a name or get all the dishes with pagination
  async findAll(params: GetDishParams) {
    const { skip, limit, name } = params;
    const where: any = {};
    if (name) where.name = { [Op.like]: `%${name}%` };

    const { count, rows } = await Dish.findAndCountAll({
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

  //Updates an existing dish
  async update(id: string | number, data: UpdateDishData) {
    const category = await Dish.findByPk(id);
    if (!category) return null;
    return await category.update(data);
  },

  //Deletes a dish record
  async delete(id: string | number) {
    const category = await Dish.findByPk(id);
    if (!category) return false;
    await category.destroy();
    return true;
  },
};
