var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var reclamationController = require('../controllers/reclamationController')
/* GET users listing. */
router.get('/',reclamationController.getAllReclamation);
//getAllReclamationByDestination
router.get('/getAllReclamationByDestination/:id',reclamationController.getAllReclamationByDestination);

router.get('/getAllReclamationByCreator/:id',reclamationController.getAllReclamationByCreator);
//getAllReclamationByCreator
router.post('/AddReclamation',authorize(),reclamationController.createReclamation);
router.delete('/:id',authorize(),reclamationController.deleteReclamation);
router.get('/:id',authorize(),reclamationController.getById);
router.put('/:id',authorize(),reclamationController.updateReclamation);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
