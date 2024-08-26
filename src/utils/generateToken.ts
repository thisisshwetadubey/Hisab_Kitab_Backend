import jwt from "jsonwebtoken";

export default async (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY||"plmnbvcxzaqwsdefbh", {
    expiresIn: process.env.JWT_EXPIRY,
  });
};
