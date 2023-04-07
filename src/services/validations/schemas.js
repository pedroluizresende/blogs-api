const Joi = require('joi');

const newUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const newCategorySchema = Joi.object({
  name: Joi.string().min(2).required(),
});

module.exports = {
  newUser,
  newCategorySchema,
};