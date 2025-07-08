import joi from "joi";

export const productSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().min(3).required(),
  stocks: joi.number().required(),
});

export const updateProductSchema = joi.object({
  stocks: joi.number().required(),
});
