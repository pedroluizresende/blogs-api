const express = require('express');
const { categoryController } = require('../controllers');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/', authentication, categoryController.insert);

module.exports = router;