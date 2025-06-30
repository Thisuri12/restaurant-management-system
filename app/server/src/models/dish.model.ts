import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

export class Dish extends Model<
  InferAttributes<Dish>,
  InferCreationAttributes<Dish>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare price: number;
  declare description?: string;
  declare image_url?: string;
  declare category_id: number;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare popular?: boolean;
  declare deal?: boolean;
}

Dish.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    image_url: { type: DataTypes.STRING, allowNull: true },
    category_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    popular: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    deal: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    tableName: "dishes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
