import Joi from "joi";

export default Joi.object({
  email: Joi.string().required(),
  otp: Joi.string().min(6).max(6).required(),
});
