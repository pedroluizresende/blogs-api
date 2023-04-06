const errorMap = {
  INVALID_FIELDS: 400,
  CONFLICT: 409,
  NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};