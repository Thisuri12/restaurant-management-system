import { Order, OrderItem, Dish } from "../models";
import { Op } from "sequelize";
import z from "zod";
import sequelize from "../config/database";

import {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
} from "../validators/order.validator";

type CreateOrderData = z.infer<typeof createOrderSchema>;
type UpdateOrderData = z.infer<typeof updateOrderSchema>;
type GetOrderParams = z.infer<typeof getOrderSchema>;

export const orderService = {
  // Create order
  async create(data: CreateOrderData) {
    const { user_id, items } = data;

    const transaction = await sequelize.transaction();

    try {
      // Get dish prices
      const dishes = await Dish.findAll({
        where: {
          id: { [Op.in]: items.map((item) => item.dish_id) },
        },
      });

      const dishPriceMap = new Map(dishes.map((dish) => [dish.id, dish.price]));

      const total_price = items.reduce((sum, item) => {
        const price = dishPriceMap.get(item.dish_id) ?? 0;
        return sum + price * item.quantity;
      }, 0);

      const order = await Order.create(
        {
          user_id,
          total_price,
          status: "pending",
        },
        { transaction }
      );

      const orderItemsData = items.map((item) => ({
        order_id: order.id,
        dish_id: item.dish_id,
        quantity: item.quantity,
        price: dishPriceMap.get(item.dish_id) ?? 0,
      }));

      await OrderItem.bulkCreate(orderItemsData, { transaction });

      await transaction.commit();
      return order;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  // Find all orders with filters and pagination
  async findAll(params: GetOrderParams) {
    const { skip, limit, status, startDate, endDate } = params;

    const where: any = {};
    if (status) where.status = status;
    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at[Op.gte] = new Date(startDate);
      if (endDate) where.created_at[Op.lte] = new Date(endDate);
    }

    const { count, rows } = await Order.findAndCountAll({
      where,
      include: [{ model: OrderItem, include: [Dish] }],
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

  // Update order
  async update(id: string | number, data: UpdateOrderData) {
    const order = await Order.findByPk(id);
    if (!order) return null;

    return await order.update(data);
  },

  // Delete order and its items
  async delete(id: string | number) {
    const transaction = await sequelize.transaction();
    try {
      const order = await Order.findByPk(id);
      if (!order) return false;

      await OrderItem.destroy({ where: { order_id: id }, transaction });
      await order.destroy({ transaction });

      await transaction.commit();
      return true;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
