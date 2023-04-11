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

const getAll = async (req, res) => {
  const { id } = req.user;
  const response = await postService.getAll(id);
  if (response.type) {
 return res.status(errorMap
    .mapError(response.type)).json({ message: response.message }); 
}
res.status(200).json(response.message);
};

const getBydId = async (req, res) => {
  const { id } = req.params;

  const response = await postService.getBydId(id);
  if (response.type) {
    return res.status(errorMap
       .mapError(response.type)).json({ message: response.message }); 
   }
   res.status(200).json(response.message);
};

module.exports = {
  insert,
  getAll,
  getBydId,
};