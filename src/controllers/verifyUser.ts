import { Request, Response } from "express";
import User from "../model/user";
import validator from "../utils/validator";
import verify from "../schema/verify";
class VerifyUser {
  process = async (req: Request, res: Response) => {
    try {
    console.log('VerifyAPI');
    
      const { email, otp } = req.body;
      validator(req.body, verify);

      const isUser = await User.findOne({ where: { email: email, otp: otp } });

      if (!isUser) {
        return res.status(200).json({
          success: false,
          data: {},
          message: "Invalid Email or OTP",
        });
      }

      const updateUser = await isUser.update({ isVerified: true, otp: null });
      return res.status(200).json({
        success: true,
        data: {},
        message: "User verified successfully",
      });
    } catch (error) {
      console.error("Error during user verification:", error);
      return res.status(500).json({
        success: false,
        data:{},
        message: "An error occurred during verification",
      });
    }
  };
}

module.exports = new VerifyUser();
