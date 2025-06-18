import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare total_price: number;
  declare status: "pending" | "preparing" | "delivered" | "cancelled";
  declare created_at?: Date;
  declare updated_at?: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    total_price: { type: DataTypes.FLOAT, allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "preparing", "delivered", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
