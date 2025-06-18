import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface dishAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export class Dish extends Model<dishAttributes> implements dishAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
  public image_url!: string;
  public category_id!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
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
    description: { type: DataTypes.TEXT, allowNull: false },
    image_url: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "dishes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
