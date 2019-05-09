var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var TypeCompanyController = require('../controllers/TypeCompanyController')
/* GET users listing. */
router.get('/',TypeCompanyController.getAllType);
router.post('/Addtype',authorize("Admin"),TypeCompanyController.createType);
router.delete('/:id',authorize("Admin"),TypeCompanyController.deleteType);
router.get('/:id',authorize("Admin"),TypeCompanyController.getById);
router.put('/:id',authorize("Admin"),TypeCompanyController.updateType);


module.exports = router;
