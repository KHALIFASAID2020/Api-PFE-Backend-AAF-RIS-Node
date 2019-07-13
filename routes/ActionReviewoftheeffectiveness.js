
var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var ActionReviewoftheeffectivenessController = require('../controllers/ActionReviewoftheeffectivenessController');
/* GET users listing. */
//router.get('/getActions',ActionController.getActions);
//updateActionByCreator
//router.put('/updateActionByCreator/:id',ActionController.updateActionByCreator);
router.get('/getActionReviewoftheeffectivenessByPlanId',ActionReviewoftheeffectivenessController.getActionReviewoftheeffectivenessByPlanId);
router.get('/',ActionReviewoftheeffectivenessController.getAllActionReviewoftheeffectiveness);
router.post('/AddReviewoftheeffectiveness',ActionReviewoftheeffectivenessController.createActionReviewoftheeffectiveness);
//getActionsCorrectiveByPlanId
router.delete('/:id',ActionReviewoftheeffectivenessController.deleteActionReviewoftheeffectiveness);
router.get('/:id',ActionReviewoftheeffectivenessController.getById);

router.put('/:id',ActionReviewoftheeffectivenessController.updateActionReviewoftheeffectiveness);
//router.get('/:id',companyController.updateCompany);
 //router.get('/AllContainementActionsByActionPlanId/:id',ActionController.AllContainementActionsByActionPlanId);
 //getAllActionReceived
 //router.get('/getAllActionReceived/:id',ActionController.getAllActionReceived);

module.exports = router;
//TypeAction