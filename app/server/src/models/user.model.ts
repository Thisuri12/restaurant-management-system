import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface userAttributes {
  id: number;
  full_name: string;
  email: string;
  password_hash: string;
  role: "customer" | "admin";
  provider: "local" | "google" | "facebook";
  social_id?: string | null;
  is_verified: boolean;
  refresh_token?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export type userCreationAttributes = Optional<
  userAttributes,
  | "id"
  | "social_id"
  | "refresh_token"
  | "is_verified"
  | "created_at"
  | "updated_at"
>;

export class User
  extends Model<userAttributes, userCreationAttributes>
  implements userAttributes
{
  public id!: number;
  public full_name!: string;
  public email!: string;
  public password_hash!: string;
  public role!: "customer" | "admin";
  public provider!: "local" | "google" | "facebook";
  public social_id?: string | null;
  public is_verified!: boolean;
  public refresh_token?: string | null;
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
    password_hash: { type: DataTypes.STRING, allowNull: false },
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
    social_id: { type: DataTypes.STRING, allowNull: true },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
