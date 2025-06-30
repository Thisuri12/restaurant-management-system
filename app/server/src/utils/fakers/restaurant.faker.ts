import { faker } from "@faker-js/faker";

export const generateFakeRestaurant = () => ({
  name: faker.company.name(),
  location: faker.location.city(),
  image_url: faker.image.urlLoremFlickr({ category: "restaurant" }),
  lat: faker.location.latitude(),
  lng: faker.location.longitude(),
  open_time: "09:00",
  close_time: "22:00",
  min_price: faker.number.float({ min: 200, max: 1000 }),
  delivery_fee: faker.number.float({ min: 50, max: 300 }),
});
