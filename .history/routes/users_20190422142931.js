var express = require('express');
var router = express.Router();
var Role = require('../_helpers/role');
var userController = require('../controllers/userController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/authenticate',userController.authenticate);

module.exports = router;
