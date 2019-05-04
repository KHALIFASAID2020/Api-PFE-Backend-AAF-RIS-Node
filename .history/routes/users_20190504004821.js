var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
var Role = require('../_helpers/role');
var userController = require('../controllers/userController')
/* GET users listing. */

router.post('/authenticate',userController.authenticate);
router.post('/signup',userController.createUser);
router.get('/', userController.getAll); // admin only
router.get('/:id', authorize(), userController.getById);       // all authenticated users

module.exports = router;
