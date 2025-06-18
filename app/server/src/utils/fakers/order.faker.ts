import { faker } from "@faker-js/faker";

export const generateFakeOrder = (dishIds: number[], userId: number) => {
  const numItems = faker.number.int({ min: 1, max: 5 });
  const items = [];

  let total_price = 0;

  for (let i = 0; i < numItems; i++) {
    const dish_id = faker.helpers.arrayElement(dishIds);
    const quantity = faker.number.int({ min: 1, max: 3 });
    const unit_price = faker.number.float({
      min: 200,
      max: 1000,
      fractionDigits: 2,
    });
    const price = unit_price * quantity;

    total_price += price;

    items.push({
      dish_id,
      quantity,
      price,
      created_at: faker.date.recent({ days: 30 }),
      updated_at: new Date(),
    });
  }

  const created_at = faker.date.recent({ days: 30 });

  return {
    user_id: userId,
    total_price: parseFloat(total_price.toFixed(2)),
    status: faker.helpers.arrayElement([
      "pending",
      "preparing",
      "delivered",
      "cancelled",
    ]),
    created_at,
    updated_at: new Date(),
    items,
  };
};
