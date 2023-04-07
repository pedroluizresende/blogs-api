const express = require('express');
const validatePostFields = require('../middlewares/validatePostFields');
const authentication = require('../middlewares/authentication');
const { postController } = require('../controllers');

const router = express.Router();

router.post('/', authentication, validatePostFields, postController.insert);

module.exports = router;