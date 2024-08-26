import Otp from "otp-generator";

export default async (
  length: number,
  digits: boolean,
  lowerCaseAlphabets: boolean,
  upperCaseAlphabets: boolean,
  specialChars: boolean
) => {
  try {
    const otp = Otp.generate(length, {
      digits,
      lowerCaseAlphabets,
      upperCaseAlphabets,
      specialChars,
    });
    return otp;
  } catch (error) {
    console.log("Error while generating otp", error);
    throw new Error("Failed to generate OTP");
  }
};
