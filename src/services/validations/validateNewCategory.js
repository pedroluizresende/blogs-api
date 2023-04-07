const { newCategorySchema } = require('./schemas');

module.exports = (category) => {
  const { error } = newCategorySchema.validate(category);

  console.log(error);
  if (error) return { type: 'INVALID_FIELDS', message: error.message };
  return { type: null, message: '' };
};