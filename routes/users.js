var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
var Role = require('../_helpers/role');
var userController = require('../controllers/userController')
/* GET users listing. */

router.post('/authenticate',userController.authenticate);
router.post('/signup',authorize("Admin"),userController.createUser);

router.get('/', userController.getAll); // admin only
router.get('/:id', userController.getById); 

router.delete('/:id',authorize("Admin"),userController.deleteUser);
      // all authenticated users
module.exports = router;
