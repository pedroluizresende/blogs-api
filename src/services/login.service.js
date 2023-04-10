const { User } = require('../models');
const { generateToken } = require('../utils/auth');

const signIn = async (userInfo) => {
  const user = await User.findOne({
    where: {
      email: userInfo.email,
    },
  });

  if (!user) return { type: 'INVALID_FIELDS', message: 'Invalid fields' };

  const token = generateToken({ id: user.id, email: user.email });
  console.log(token);
  return { type: null, message: token };
};

module.exports = {
  signIn,
};