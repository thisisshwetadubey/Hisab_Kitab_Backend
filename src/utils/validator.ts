import { ObjectSchema } from "joi";

export default (data: any, schema: ObjectSchema) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {

    console.log("here validatorssss");
    const { details } = error;
    const errors = details.map((i) => i.message.replace(/"/g, ""));
    throw errors.length > 1 ? errors : errors[0];
  }
  return;
};
