import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface ratingAttributes {
  id: number;
  dish_id: number;
  user_id?: number;
  rating: number;
  comment?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Rating
  extends Model<ratingAttributes>
  implements ratingAttributes
{
  public id!: number;
  public dish_id!: number;
  public user_id?: number | undefined;
  public rating!: number;
  public comment?: string | undefined;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    dish_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    rating: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "ratings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
