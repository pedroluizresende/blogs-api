const { postService } = require('../services');
const errorMap = require('../utils/errorMap');

const insert = async (req, res) => {
  const { id } = req.user;
  const response = await postService.insert(id, req.body);
  if (response.type) {
 return res.status(errorMap
    .mapError(response.type)).json({ message: response.message }); 
}
  res.status(201).json(response.message);
};

module.exports = {
  insert,
};