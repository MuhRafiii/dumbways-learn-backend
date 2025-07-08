import joi from "joi";

export const productSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().min(3).required(),
  stocks: joi.number().required(),
});

export const uploadImageSchema = joi.object({
  name: joi.string().required(),
  picture: joi.string(),
});

export const updateProductSchema = joi.object({
  stocks: joi.number(),
});
