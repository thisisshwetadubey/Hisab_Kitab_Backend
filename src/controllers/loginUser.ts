import { Request, Response } from "express";
import User from "../model/user";
import validator from "../utils/validator";
import login from "../schema/login";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
class LoginUser {
  loggedInUser = async (email: string) => {
    const user = await User.findOne({ where: { email: email } });
    if (!user) throw "Invalid Email or Password";
    if (user && !user.isVerified) throw "User not verified";
    return user;
  };

  process = async (req: Request, res: Response) => {
    try {
      validator(req.body, login);
      const { email, password } = req.body;
      const checkUser = await this.loggedInUser(email);
      const verifyPassword = await bcrypt.compare(password, checkUser.password);
      if (!verifyPassword) throw "Invalid Email or Password";
      const generatedToken = await generateToken(checkUser.id);
      return res.status(200).json({
        success: true,
        data: generatedToken,
        message: "User logged in successfully",
      });
    } catch (error) {
      console.error("Error during user login:", error);
      return res.status(400).json({
        success: false,
        data: {},
        message: error,
      });
    }
  };
}

module.exports = new LoginUser();
