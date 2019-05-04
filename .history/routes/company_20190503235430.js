var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var companyController = require('../controllers/companyController')
/* GET users listing. */
router.get('/',companyController.getAllCompany);
router.post('/AddCompany',companyController.createComapny);
router.delete('/:id',companyController.deleteCompany);
router.get('/:id',companyController.getById);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
