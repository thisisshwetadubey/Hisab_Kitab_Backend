import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../config/db";



class User extends Model {
  public id!: number;
  public userName!: string;
  public email!: string;
  public phone_number!: string;
  public password!: string;
  public isVerified!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   is: /^[0-9]{10,15}$/,
      // },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      // allowNull:false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    timestamps: false,
  }
);

export default User;
