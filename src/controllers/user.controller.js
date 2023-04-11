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
     res.status(200).json(response.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await userService.getById(id);
  if (response.type) {
    return res.status(errorMap
       .mapError(response.type)).json({ message: response.message }); 
   }
     res.status(200).json(response.message);
};

const deleteOwnUser = async (req, res) => {
  const { id } = req.user;

  const response = userService.deleteOwnUser(id);

  if (response.type) {
    return res.status(errorMap
       .mapError(response.type)).json({ message: response.message }); 
   }

   res.sendStatus(204);
};

module.exports = {
  insert,
  getAll,
  getById,
  deleteOwnUser,
};