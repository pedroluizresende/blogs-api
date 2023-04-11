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

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.id;

  const response = await postService.update(id, userId, { title, content });

  if (response.type) {
    return res.status(errorMap
       .mapError(response.type)).json({ message: response.message }); 
   }
   res.status(200).json(response.message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const response = await postService.remove(id, userId);

  if (response.type) {
    return res.status(errorMap
       .mapError(response.type)).json({ message: response.message }); 
   }

   res.sendStatus(204);
};

module.exports = {
  insert,
  getAll,
  getBydId,
  update,
  remove,
};