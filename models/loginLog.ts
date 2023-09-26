import { database } from "@/libs/database";

import { Model, DataTypes } from "sequelize";

export default class LoginLog extends Model {}

LoginLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "login_log",
    sequelize: database,
  }
);
