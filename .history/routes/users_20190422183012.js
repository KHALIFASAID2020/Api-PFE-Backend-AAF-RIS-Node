var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
var Role = require('../_helpers/role');
var userController = require('../controllers/userController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/authenticate',userController.authenticate);

router.get('/', authorize(Role.Admin), getAll); // admin only
module.exports = router;
