import bcrypt from "bcryptjs";

export default async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log("Error while hashing password", error);
    throw new Error("Failed to hash password");
  }
};
