const { loginService } = require('../services');
const errorMap = require('../utils/errorMap');

const signIn = async (req, res) => {
  const response = await loginService.signIn(req.body);
  if (response.type) {
 return res.status(errorMap
    .mapError(response.type)).json({ message: response.message }); 
}
  res.status(200).json({ token: response.message });
};

module.exports = {
  signIn,
};