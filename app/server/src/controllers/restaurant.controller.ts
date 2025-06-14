import { Request, Response } from "express";
import { Restaurant } from "@models/restaurant.model";
import {
  createRestaurantSchema,
  getRestaurantsSchema,
  updateRestaurantSchema,
  deleteRestaurantSchema,
} from "src/validators/restaurant.validator";
import { Op } from "sequelize";

//Create New Restaurant function
export const createRestaurant = async (req: Request, res: Response) => {
  const parsed = createRestaurantSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ errors: parsed.error.flatten() });
    return;
  }

  const {
    name,
    location,
    lat,
    lng,
    open_time,
    close_time,
    min_price,
    delivery_fee,
  } = parsed.data;

  try {
    const restaurant = await Restaurant.create({
      name,
      location,
      lat,
      lng,
      open_time,
      close_time,
      min_price,
      delivery_fee,
    });

    res.status(201).json(restaurant);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create restaurant", error: err });
  }
};

//Get a restaurant by searching a name or get all the restaurants
export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      name,
      page = 1,
      limit = 10,
    } = getRestaurantsSchema.parse(req.query);
    const offset = (page - 1) * limit;
    const whereClause = name ? { name: { [Op.like]: `%${name}%` } } : {};
    const restaurants = await Restaurant.findAll({
      where: whereClause,
      limit,
      offset,
    });

    res.status(200).json({
      page,
      limit,
      results: restaurants.length,
      data: restaurants,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch restaurants", error: err });
  }
};

//Update a restaurant by Id
export const updateRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedBody = updateRestaurantSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ errors: parsedBody.error.flatten() });
    return;
  }

  try {
    const restaurant = await Restaurant.findByPk(Number(id));
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }
    await restaurant.update(parsedBody.data);
    res.status(200).json(restaurant);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update restaurant", error: err });
  }
};

//Delete a restaurant by Id
export const deleteRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedData = deleteRestaurantSchema.safeParse({ id });
  if (!parsedData.success) {
    res.status(400).json({ errors: parsedData.error.flatten() });
    return;
  }
  try {
    const restaurant = await Restaurant.findByPk(Number(id));
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    await restaurant.destroy();
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete restaurant", error: err });
  }
};
