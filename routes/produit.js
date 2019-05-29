var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var produitController = require('../controllers/produitController')
/* GET users listing. */
router.get('/',produitController.getAllProduit);
router.post('/AddProduit',authorize("Admin"),produitController.createProduit);
router.delete('/:id',authorize("Admin"),produitController.deleteProduit);
router.get('/:id',authorize("Admin"),produitController.getById);
router.put('/:id',authorize("Admin"),produitController.updateProduit);
router.get('/getByIdCompanyProduit/:id',produitController.getByIdCompanyProduit);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
