import { User, Dish, Order, OrderItem } from "../models";
import { generateFakeOrder } from "../utils/fakers/order.faker";
import sequelize from "../config/database";
import { faker } from "@faker-js/faker";

const seedOrders = async () => {
  try {
    await sequelize.sync();

    const users = await User.findAll();
    const dishes = await Dish.findAll();

    if (!users.length || !dishes.length) {
      throw new Error("Make sure users and dishes are seeded first.");
    }

    const dishIds = dishes.map((d) => d.id);
    const userIds = users.map((u) => u.id);

    for (let i = 0; i < 10000; i++) {
      const userId = faker.helpers.arrayElement(userIds);
      const orderData = generateFakeOrder(dishIds, userId);

      const order = await Order.create({
        user_id: orderData.user_id,
        total_price: orderData.total_price,
        status: orderData.status,
        created_at: orderData.created_at,
        updated_at: orderData.updated_at,
      });

      const orderItems = orderData.items.map((item) => ({
        ...item,
        order_id: order.id,
      }));

      await OrderItem.bulkCreate(orderItems);
    }

    console.log("Finished seeding 10,000 orders.");
  } catch (error) {
    console.error("Seeding orders failed:", error);
  } finally {
    await sequelize.close();
  }
};

seedOrders();
