
var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var ActionCorrectiveController = require('../controllers/ActionCorrectiveController');
/* GET users listing. */
//router.get('/getActions',ActionController.getActions);
//updateActionByCreator
//router.put('/updateActionByCreator/:id',ActionController.updateActionByCreator);
router.get('/getActionsCorrectiveByPlanId',ActionCorrectiveController.getActionsCorrectiveByPlanId);
router.get('/',ActionCorrectiveController.getAllActionCorrective);
router.post('/AddActionCorrective',ActionCorrectiveController.createActionCorrective);
//getActionsCorrectiveByPlanId
router.delete('/:id',ActionCorrectiveController.deleteActionCorrective);
router.get('/:id',ActionCorrectiveController.getById);
router.put('/:id',ActionCorrectiveController.updateActionCorrectiveByCreator);
//router.get('/:id',companyController.updateCompany);
 //router.get('/AllContainementActionsByActionPlanId/:id',ActionController.AllContainementActionsByActionPlanId);
 //getAllActionReceived
 //router.get('/getAllActionReceived/:id',ActionController.getAllActionReceived);

module.exports = router;
//TypeAction