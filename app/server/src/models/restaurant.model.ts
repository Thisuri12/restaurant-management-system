import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

export class Restaurant extends Model<
  InferAttributes<Restaurant>,
  InferCreationAttributes<Restaurant>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare location: string;
  declare lat: number;
  declare lng: number;
  declare open_time: string;
  declare close_time: string;
  declare min_price: number;
  declare delivery_fee: number;
  declare created_at?: Date;
  declare updated_at?: Date;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    lat: { type: DataTypes.FLOAT, allowNull: false },
    lng: { type: DataTypes.FLOAT, allowNull: false },
    open_time: { type: DataTypes.STRING, allowNull: false },
    close_time: { type: DataTypes.STRING, allowNull: false },
    min_price: { type: DataTypes.FLOAT, allowNull: false },
    delivery_fee: { type: DataTypes.FLOAT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "restaurant",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
