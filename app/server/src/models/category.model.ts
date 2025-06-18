import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface categoryAttributes {
  id: number;
  name: string;
  restaurant_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export class Category
  extends Model<categoryAttributes>
  implements categoryAttributes
{
  public id!: number;
  public name!: string;
  public restaurant_id!: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    restaurant_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "category",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
