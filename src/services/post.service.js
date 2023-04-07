const { validateCategorysId } = require('./validations/validateNewPost');

const insert = async ({ title, content, categoryIds }) => {
const error = await validateCategorysId(categoryIds);
console.log(error);
if (error.type) return error;

return { type: null, message: 'tudo certo' };
};

module.exports = {
  insert,
};