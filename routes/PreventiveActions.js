
var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var PreventiveActionsController = require('../controllers/PreventiveActionsController');
/* GET users listing. */
//router.get('/getActions',ActionController.getActions);
//updateActionByCreator
//router.put('/updateActionByCreator/:id',ActionController.updateActionByCreator);
router.get('/getPreventiveActionsByPlanId',PreventiveActionsController.getPreventiveActionsByPlanId);
router.get('/',PreventiveActionsController.getAllPreventiveActions);
router.post('/AddPreventiveActions',PreventiveActionsController.createPreventiveActions);
//getActionsCorrectiveByPlanId
router.delete('/:id',PreventiveActionsController.deletePreventiveActions);
router.get('/:id',PreventiveActionsController.getById);
router.put('/:id',PreventiveActionsController.updatePreventiveActionsByCreator);
//router.get('/:id',companyController.updateCompany);
 //router.get('/AllContainementActionsByActionPlanId/:id',ActionController.AllContainementActionsByActionPlanId);
 //getAllActionReceived
 //router.get('/getAllActionReceived/:id',ActionController.getAllActionReceived);

module.exports = router;
//TypeAction