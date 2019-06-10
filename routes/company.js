var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var companyController = require('../controllers/companyController')
/* GET users listing. */
router.get('/',companyController.getAllCompany);
router.get('/getAllCompanyClient',companyController.getAllCompanyClient);
router.get('/getByIdCompanyType/:id',companyController.getByIdCompanyType);
router.post('/AddCompany',authorize("Admin"),companyController.createComapny);
router.delete('/:id',companyController.deleteCompany);
router.get('/:id',authorize("Admin"),companyController.getById);
router.put('/:id',authorize("Admin"),companyController.updateCompany);
//getAllCompanyClient
//company/getCompanyByTypeCompany/${TypeCompanyId}
module.exports = router;//5cd618fab9462327c832d57c

