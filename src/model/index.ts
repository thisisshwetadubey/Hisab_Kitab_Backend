import { Sequelize, Options } from "sequelize";
import config from "../config/db";

interface Config {
  [key: string]: Options;
}

const env = process.env.NODE_ENV || "development";
// const dbconfig = (config as Config)[env];

const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    logging: false,
  }
);

interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  user?: any; // Adjust the type according to your user model
}

const db: DB = {
  sequelize,
  Sequelize,
};  
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);

module.exports = db;
