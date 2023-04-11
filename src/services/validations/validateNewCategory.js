const { newCategorySchema } = require('./schemas');

module.exports = (category) => {
  const { error } = newCategorySchema.validate(category);

  if (error) return { type: 'INVALID_FIELDS', message: error.message };
  return { type: null, message: '' };
};