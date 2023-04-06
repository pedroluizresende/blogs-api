const express = require('express');
const { userController } = require('../controllers');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/', userController.insert);

router.get('/', authentication, userController.getAll);

router.get('/:id', authentication, userController.getById);

module.exports = router;