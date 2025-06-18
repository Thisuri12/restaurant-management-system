import { Order, OrderItem, Dish } from "../models";
import { Op, fn, col } from "sequelize";

// Get sales grouped by day
export const getSalesSummary = async (from?: string, to?: string) => {
  const where: any = {};
  if (from) where.created_at = { [Op.gte]: new Date(from) };
  if (to)
    where.created_at = { ...(where.created_at || {}), [Op.lte]: new Date(to) };

  return await Order.findAll({
    attributes: [
      [fn("DATE", col("created_at")), "date"],
      [fn("SUM", col("total_price")), "total_sales"],
    ],
    where,
    group: [fn("DATE", col("created_at"))],
    order: [[fn("DATE", col("created_at")), "DESC"]],
  });
};

// Get top-selling dishes
export const getTopDishes = async (limit = 10) => {
  return await OrderItem.findAll({
    attributes: ["dish_id", [fn("SUM", col("quantity")), "total_sold"]],
    group: ["dish_id"],
    order: [[fn("SUM", col("quantity")), "DESC"]],
    limit,
    include: [{ model: Dish }],
  });
};

// Get average value of all orders
export const getAverageOrderValue = async () => {
  const result = await Order.findAll({
    attributes: [[fn("AVG", col("total_price")), "avg_order"]],
  });

  return result[0];
};
