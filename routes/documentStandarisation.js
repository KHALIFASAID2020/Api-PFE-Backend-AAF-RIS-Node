var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var documentStandarisationController = require('../controllers/documentStandarisationController')
/* GET users listing. */
router.get('/',documentStandarisationController.getAllDocument);
router.post('/AddDocument',authorize("Admin"),documentStandarisationController.createDocument);
router.delete('/:id',authorize("Admin"),documentStandarisationController.deleteDocument);
router.get('/:id',authorize("Admin"),documentStandarisationController.getById);
router.put('/:id',authorize("Admin"),documentStandarisationController.updateDocument);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
