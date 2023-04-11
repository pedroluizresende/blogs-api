const express = require('express');
const validatePostFields = require('../middlewares/validatePostFields');
const authentication = require('../middlewares/authentication');
const { postController } = require('../controllers');
const validateUpdatePostFields = require('../middlewares/validateUpdatePostFields');

const router = express.Router();

router.post('/', authentication, validatePostFields, postController.insert);

router.get('/', authentication, postController.getAll);

router.get('/:id', authentication, postController.getBydId);

router.put('/:id', authentication, validateUpdatePostFields, postController.update);

router.delete('/:id', authentication, postController.remove);

module.exports = router;