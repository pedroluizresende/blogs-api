const { postService } = require('../services');
const errorMap = require('../utils/errorMap');

const insert = async (req, res) => {
  const response = await postService.insert(req.body);
  if (response.type) {
 return res.status(errorMap
    .mapError(response.type)).json({ message: response.message }); 
}
  res.status(200).json(response.message);
};

module.exports = {
  insert,
};