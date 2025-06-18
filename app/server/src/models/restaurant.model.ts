import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface restaurantAttributes {
  id: number;
  name: string;
  location: string;
  lat: number;
  lng: number;
  open_time: string;
  close_time: string;
  min_price: number;
  delivery_fee: number;
  created_at?: Date;
  updated_at?: Date;
}

export class Restaurant
  extends Model<restaurantAttributes>
  implements restaurantAttributes
{
  public id!: number;
  public name!: string;
  public location!: string;
  public lat!: number;
  public lng!: number;
  public open_time!: string;
  public close_time!: string;
  public min_price!: number;
  public delivery_fee!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
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
