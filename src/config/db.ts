import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const POSTGRES_DB = process.env.POSTGRES_DB as string;
const POSTGRES_HOST = process.env.POSTGRES_HOST as string;
const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT as string, 10);
const POSTGRES_USER = process.env.POSTGRES_USER as string;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

const sequelize = new Sequelize({
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
  host: POSTGRES_HOST,
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ PostgreSQL Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database: ", err);
  });

export default sequelize;
