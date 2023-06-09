const { validateToken } = require('../utils/auth');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
 return res.status(401)
    .json({ message: 'Token not found' }); 
}

    const response = validateToken(authorization);
    if (response) {
      req.user = {
        ...response,
      };
    next();
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};