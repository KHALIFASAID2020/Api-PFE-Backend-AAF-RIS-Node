var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var companyController = require('../controllers/companyController')
/* GET users listing. */
router.get('/',companyController.getAllCompany);
router.post('/AddCompany',authorize("Admin"),companyController.createComapny);
router.delete('/:id',authorize("Admin"),companyController.deleteCompany);
router.get('/:id',authorize("Admin"),companyController.getById);
router.put('/:id',authorize("Admin"),companyController.updateCompany);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
