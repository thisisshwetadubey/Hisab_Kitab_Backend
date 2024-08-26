import { Request, Response } from "express";
import User from "../model/user";
import validator from "../utils/validator";
import register from "../schema/register";
import generateOTP from "../utils/generateOTP";
import sendEmail from "../utils/sendEmail";
import hashPassword from "../utils/hashPassword";
class RegisterUser {
  process = async (req: Request, res: Response) => {
    try {
      validator(req.body, register);

      const { userName, email, phone_number, password } = req.body;
      const isUser = await User.findOne({ where: { email: email } });

      if (isUser) throw new Error("User already exists");

      //Generate OTP
      const otp = await generateOTP(6, true, false, false, false);

      //Hash Password
      const encryptPassword = await hashPassword(password);

      const registerUser = await User.create({
        userName: userName,
        email: email,
        phone_number: phone_number,
        password: encryptPassword,
        otp: otp,
      });

      let subject = "OTP Verification";
      let body = `Your OTP for registration is ${otp}`;
      //send Email
      await sendEmail(email, subject, body);
      if (registerUser)
        return res.status(201).json({
          success: true,
          data: registerUser,
          message: "User created successfully",
        });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }
  };
}
module.exports = new RegisterUser();
