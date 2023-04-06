const { userService } = require('../services');
const errorMap = require('../utils/errorMap');

const insert = async (req, res) => {
  const response = await userService.insert(req.body);
  if (response.type) {
 return res.status(errorMap
    .mapError(response.type)).json({ message: response.message }); 
}
  res.status(201).json({ token: response.message });
};

module.exports = {
  insert,
};