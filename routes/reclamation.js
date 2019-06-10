var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var reclamationController = require('../controllers/reclamationController')
/* GET users listing. */
router.get('/',reclamationController.getAllReclamation);
router.get('/getAllReclamationByCreator/:id',reclamationController.getAllReclamationByCreator);
//getAllReclamationByCreator
router.post('/AddReclamation',authorize("Admin"),reclamationController.createReclamation);
router.delete('/:id',authorize("Admin"),reclamationController.deleteReclamation);
router.get('/:id',authorize("Admin"),reclamationController.getById);
router.put('/:id',authorize("Admin"),reclamationController.updateReclamation);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
