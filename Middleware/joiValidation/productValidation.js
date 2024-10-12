import Joi from "joi";

export const productValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    color: Joi.string(),
    quantity: Joi.number().min(0),
    isDeleted: Joi.boolean(),
    imageSrc: Joi.string(),
    imageAlt: Joi.string(),
  });
  

  