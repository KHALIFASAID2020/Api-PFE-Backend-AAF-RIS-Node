var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var ActionController = require('../controllers/ActionController');
/* GET users listing. */
router.get('/getActions',ActionController.getActions);

router.get('/',ActionController.getAllAction);
router.post('/AddAction',ActionController.createAction);
router.delete('/:id',ActionController.deleteAction);
router.get('/:id',ActionController.getById);
router.put('/:id',ActionController.updateAction);
//router.get('/:id',companyController.updateCompany);
 router.get('/AllContainementActionsByActionPlanId/:id',ActionController.AllContainementActionsByActionPlanId);
 

module.exports = router;
//TypeAction