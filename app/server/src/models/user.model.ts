import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface UserAttributes {
  id: number;
  full_name: string;
  email: string;
  password_hash: string;
  role: "customer" | "admin";
  provider: "local" | "google" | "facebook";
  social_id?: string;
  is_verified: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "created_at" | "updated_at" | "social_id" | "is_verified"
>;
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public full_name!: string;
  public email!: string;
  public password_hash!: string;
  public role!: "customer" | "admin";
  public provider!: "local" | "google" | "facebook";
  public social_id?: string;
  public is_verified!: boolean;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("customer", "admin"),
      allowNull: false,
      defaultValue: "customer",
    },
    provider: {
      type: DataTypes.ENUM("local", "google", "facebook"),
      allowNull: false,
      defaultValue: "local",
    },
    social_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
