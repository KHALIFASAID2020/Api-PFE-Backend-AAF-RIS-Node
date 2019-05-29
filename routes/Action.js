var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var ActionController = require('../controllers/ActionController');
/* GET users listing. */
router.get('/',ActionController.getAllAction);
router.post('/AddAction',authorize("Admin"),ActionController.createAction);
router.delete('/:id',authorize("Admin"),ActionController.deleteAction);
router.get('/:id',authorize("Admin"),ActionController.getById);
router.put('/:id',authorize("Admin"),ActionController.updateAction);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
