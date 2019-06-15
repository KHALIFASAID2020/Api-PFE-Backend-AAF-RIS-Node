var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var typeCompanyController = require('../controllers/TypeCompanyController')
/* GET users listing. */
router.get('/',typeCompanyController.getAllTypeCompany);
router.post('/AddType',authorize("Admin"),typeCompanyController.createTypeComapny);
router.delete('/:id',authorize("Admin"),typeCompanyController.deleteTypeCompany);
router.get('/:id',typeCompanyController.getById);
router.put('/:id',authorize("Admin"),typeCompanyController.updateType);

//router.get('/:id',companyController.updateCompany);

module.exports = router;
