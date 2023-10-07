import { database } from "@/libs/database";

import { Model, DataTypes, TIME } from "sequelize";

export default class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    featured_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meta_keyword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date,
    },
  },
  {
    timestamps: false,
    tableName: "blog",
    sequelize: database,
  }
);
