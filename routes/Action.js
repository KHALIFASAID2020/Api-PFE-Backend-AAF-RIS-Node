var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var ActionController = require('../controllers/ActionController');
/* GET users listing. */
router.get('/getActions',ActionController.getActions);
//updateActionByCreator
router.put('/updateActionByCreator/:id',ActionController.updateActionByCreator);
router.get('/AllActionGroupByStatus',ActionController.AllActionGroupByStatus);
router.get('/',ActionController.getAllAction);
router.post('/AddAction',ActionController.createAction);
router.delete('/:id',ActionController.deleteAction);
router.get('/:id',ActionController.getById);
router.put('/:id',ActionController.updateAction);
//UpdateActionReceived
router.put('/UpdateActionReceived/:id',ActionController.UpdateActionReceived);

//router.get('/:id',companyController.updateCompany);
 router.get('/AllContainementActionsByActionPlanId/:id',ActionController.AllContainementActionsByActionPlanId);
 //getAllActionReceived
 //getAllActionReceivedNotAttribue
 router.get('/getAllActionReceivedNotAttribue/:id',ActionController.getAllActionReceivedNotAttribue);

 router.get('/getAllActionReceived/:id',ActionController.getAllActionReceived);

module.exports = router;
//TypeAction