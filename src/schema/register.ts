import Joi from "joi";

export default Joi.object({
  userName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().required(),
  password: Joi.string().min(6).max(16).required(),
});
