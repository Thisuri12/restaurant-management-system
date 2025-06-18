import sequelize from "../config/database";
import { Dish, Order, OrderItem } from "../models";
import { generateFakeOrder } from "../utils/fakers/order.faker";

const seedOrders = async () => {
  await sequelize.sync({ alter: true });

  const dishes = await Dish.findAll();
  const dishIds = dishes.map((d) => d.id);

  if (dishIds.length === 0) {
    console.error("No dishes found. Seed dishes before orders.");
    return;
  }

  for (let i = 0; i < 10000; i++) {
    const user_id = (i % 10) + 1;
    const fakeOrder = generateFakeOrder(dishIds, user_id);

    const order = await Order.create({
      user_id: fakeOrder.user_id,
      total_price: fakeOrder.total_price,
      status: fakeOrder.status,
      created_at: fakeOrder.created_at,
      updated_at: fakeOrder.updated_at,
    });

    await Promise.all(
      fakeOrder.items.map((item) =>
        OrderItem.create({
          order_id: order.id,
          dish_id: item.dish_id,
          quantity: item.quantity,
          price: item.price,
          created_at: item.created_at,
          updated_at: item.updated_at,
        })
      )
    );

    if (i % 1000 === 0) {
      console.log(`Seeded ${i} orders`);
    }
  }

  console.log("Finished seeding 10,000+ orders");
};

seedOrders();
