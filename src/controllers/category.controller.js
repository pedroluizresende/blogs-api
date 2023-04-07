const { categoryService } = require('../services');
const errorMap = require('../utils/errorMap');

const insert = async (req, res) => {
  const response = await categoryService.insert(req.body);
  if (response.type) {
 return res.status(errorMap
    .mapError(response.type)).json({ message: response.message }); 
}
  res.status(201).json(response.message);
};

const getAll = async (req, res) => {
  const response = await categoryService.getAll();
  if (response.type) {
    return res.status(errorMap
       .mapError(response.type)).json({ message: response.message }); 
   }
   res.status(200).json(response.message);
};

module.exports = {
  insert,
  getAll,
};