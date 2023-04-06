const express = require('express');
const { validateLoginFields } = require('../middlewares');
const { loginController } = require('../controllers');

const router = express.Router();

router.post('/', validateLoginFields, loginController.signIn);

module.exports = router;