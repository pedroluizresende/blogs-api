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

const getAll = async (req, res) => {
  const response = await userService.getAll();
  if (response.type) {
    return res.status(errorMap
       .mapError(response.type)).json({ message: response.message }); 
   }
   console.log(response);
     res.status(200).json(response.message);
};

module.exports = {
  insert,
  getAll,
};