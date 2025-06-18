import { Rating } from "@models/rating.model";
import { z } from "zod";
import {
  createRatingSchema,
  updateRatingSchema,
  getRatingSchema,
} from "../validators/rating.validator";

// Type definitions derived from Zod validation schemas.
type CreateRating = z.infer<typeof createRatingSchema>;
type UpdateRating = z.infer<typeof updateRatingSchema>;
type GetRatingParams = z.infer<typeof getRatingSchema>;

export const ratingService = {
  //Creates a new dish
  async create(data: CreateRating) {
    return await Rating.create(data);
  },

  // Get all ratings for a dish with pagination
  async findAll(params: GetRatingParams) {
    const { skip, limit, dish_id, sort } = params;
    const where: any = {};
    if (dish_id) where.dish_id = dish_id;

    let order: any = [["created_at", "DESC"]];

    if (sort === "highest") {
      order = [["rating", "DESC"]];
    } else if (sort === "lowest") {
      order = [["rating", "ASC"]];
    }

    const { count, rows } = await Rating.findAndCountAll({
      where,
      limit,
      offset: skip,
      order,
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

  // Updates an existing rating
  async update(id: string | number, data: UpdateRating) {
    const rating = await Rating.findByPk(id);
    if (!rating) return null;
    return await rating.update(data);
  },

  // Deletes a rating record
  async delete(id: string | number) {
    const rating = await Rating.findByPk(id);
    if (!rating) return false;
    await rating.destroy();
    return true;
  },
};
