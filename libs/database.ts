import { Sequelize } from "sequelize";
export const database = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false, // TO DO : Check it
  dialectModule: require("mysql2"),
});
