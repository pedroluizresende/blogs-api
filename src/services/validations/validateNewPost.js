const { Category } = require('../../models');

const validateCategorysId = async (categories) => {
  const categoriesDB = await Promise.all(categories.map((id) => Category.findByPk(id)));

  if (categoriesDB.some((c) => c === null) || !categories.length) {
    return { type: 'INVALID_FIELDS', message: 'one or more "categoryIds" not found' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateCategorysId,
};