var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var ActionPlanController = require('../controllers/ActionPlanController');
/* GET users listing. */
router.get('/',ActionPlanController.getAllActionPlan);
router.post('/AddActionPlan',ActionPlanController.createActionPlan);
//getActionPlanByComplaint
router.get('/getActionPlanByComplaint/:id',ActionPlanController.getActionPlanByComplaint);

router.delete('/:id',authorize("Admin"),ActionPlanController.deleteActionPlan);
router.get('/:id',ActionPlanController.getById);
router.put('/updateActionPlanTeamLeader/:id',ActionPlanController.updateActionPlanTeamLeader);

router.put('/:id',authorize("Admin"),ActionPlanController.updateActionPlan);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
