var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var  CommandeController= require('../controllers/CommandeController')
/* GET users listing. */
router.get('/',CommandeController.getAllCommande);
router.post('/AddCommande',authorize("Admin"),CommandeController.createCommande);
router.delete('/:id',CommandeController.deleteCommande);
router.get('/:id',authorize("Admin"),CommandeController.getByIdCommande);
router.put('/:id',authorize("Admin"),CommandeController.updateCommande);
router.get('/getByIdCompanyProduit/:id',CommandeController.getByIdCompanyProduit);

module.exports = router;
