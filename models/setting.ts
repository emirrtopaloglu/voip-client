import { database } from "@/libs/database";

import { Model, DataTypes } from "sequelize";

export default class Setting extends Model {}

Setting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    kv_settings: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "setting",
    sequelize: database,
  }
);
