var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var GroupeResponsableActionController = require('../controllers/GroupeResponsableAction');
/* GET users listing. */
router.get('/',GroupeResponsableActionController.getAllGroupeResponsableAction);

router.get('/groupeByActionPlan/:id',GroupeResponsableActionController.getGroupeByActionPlan);

router.post('/AddGroup',GroupeResponsableActionController.createGroupeResponsableAction);
router.delete('/:id',GroupeResponsableActionController.deleteGroupeResponsableAction);
router.get('/:id',GroupeResponsableActionController.getById);
router.put('/:id',GroupeResponsableActionController.updateGroupeResponsableAction);
//router.get('/:id',companyController.updateCompany);
//getGroupeByActionPlan
module.exports = router;
