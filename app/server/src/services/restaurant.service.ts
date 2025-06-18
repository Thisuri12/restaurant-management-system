import { Restaurant } from "../models/restaurant.model";
import z from "zod";
import { Op } from "sequelize";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
  getRestaurantsSchema,
} from "../validators/restaurant.validator";

// Type definitions derived from Zod validation schemas.
type CreateRestaurantData = z.infer<typeof createRestaurantSchema>;
type UpdateRestaurantData = z.infer<typeof updateRestaurantSchema>;
type GetRestaurantsParams = z.infer<typeof getRestaurantsSchema>;

export const restaurantService = {
  //Creates a new restaurant
  async create(data: CreateRestaurantData) {
    return await Restaurant.create(data);
  },

  //Finds all restaurants with pagination and optional name filtering
  async findAll(params: GetRestaurantsParams) {
    const { skip, limit, name } = params;
    const where = name ? { name: { [Op.iLike]: `%${name}%` } } : {};

    const { count, rows } = await Restaurant.findAndCountAll({
      where,
      limit,
      offset: skip,
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

  //Updates an existing restaurant
  async update(id: string | number, data: UpdateRestaurantData) {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) return null;
    return await restaurant.update(data);
  },

  //Deletes a restaurant record
  async delete(id: string | number) {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) return false;
    await restaurant.destroy();
    return true;
  },
};
