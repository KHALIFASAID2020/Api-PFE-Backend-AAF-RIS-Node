var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var ActionController = require('../controllers/ActionController');
/* GET users listing. */
router.get('/',ActionController.getAllAction);
router.post('/AddAction',ActionController.createAction);
router.delete('/:id',ActionController.deleteAction);
router.get('/:id',ActionController.getById);
router.put('/:id',ActionController.updateAction);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
