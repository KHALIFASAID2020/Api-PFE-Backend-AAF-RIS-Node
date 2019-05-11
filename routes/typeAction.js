var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var TypeActionController = require('../controllers/TypeActionController')
/* GET users listing. */
router.get('/',TypeActionController.getAllTypeAction);
router.post('/AddTypeAction',authorize("Admin"),TypeActionController.createTypeAction);
router.delete('/:id',authorize("Admin"),TypeActionController.deleteTypeAction);
router.get('/:id',authorize("Admin"),TypeActionController.getById);
router.put('/:id',authorize("Admin"),TypeActionController.updateTypeAction);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
