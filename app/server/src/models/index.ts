import { Restaurant } from "./restaurant.model";
import { Category } from "./category.model";
import { Dish } from "./dish.model";
import { Rating } from "./rating.model";
import { User } from "./user.model";

//Restaurant->Category
Restaurant.hasMany(Category, { foreignKey: "restaurant_id" });
Category.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

//Category->Dishes
Category.hasMany(Dish, { foreignKey: "category_id" });
Dish.belongsTo(Category, { foreignKey: "category_id" });

//Dishes->Rating
Dish.hasMany(Rating, { foreignKey: "dish_id" });
Rating.belongsTo(Dish, { foreignKey: "dish_id" });

//User->Rating
User.hasMany(Rating, { foreignKey: "user_id" });
Rating.belongsTo(User, { foreignKey: "user_id" });

export { Restaurant, Category, Dish, Rating };
