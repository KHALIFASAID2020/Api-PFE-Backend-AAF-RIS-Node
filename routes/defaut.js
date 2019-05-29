var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var defautController = require('../controllers/DefaultController')
/* GET users listing. */
router.get('/',authorize("Admin"),defautController.getAllDefaut);
router.post('/AddDefaut',authorize("Admin"),defautController.createDefaut);
router.delete('/:id',authorize("Admin"),defautController.deleteDefaut);
router.get('/:id',authorize("Admin"),defautController.getById);
router.put('/:id',authorize("Admin"),defautController.updateDefaut);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
