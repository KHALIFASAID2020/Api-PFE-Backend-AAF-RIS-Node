var express = require('express');
var router = express.Router();
//const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var companyController = require('../controllers/companyController')
/* GET users listing. */
router.get('/',companyController.getAllCompany);
router.post('/AddCompany',companyController.createComapny);
      // all authenticated users

module.exports = router;
