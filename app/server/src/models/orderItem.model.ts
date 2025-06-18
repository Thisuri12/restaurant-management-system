import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

export class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  declare id: CreationOptional<number>;
  declare order_id: number;
  declare dish_id: number;
  declare quantity: number;
  declare price: number;
  declare created_at?: Date;
  declare updated_at?: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    dish_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "order_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
