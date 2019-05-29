var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var GroupeResponsableActionController = require('../controllers/GroupeResponsableAction');
/* GET users listing. */
router.get('/',GroupeResponsableActionController.getAllGroupeResponsableAction);
router.post('/AddGroup',authorize("Admin"),GroupeResponsableActionController.createGroupeResponsableAction);
router.delete('/:id',authorize("Admin"),GroupeResponsableActionController.deleteGroupeResponsableAction);
router.get('/:id',authorize("Admin"),GroupeResponsableActionController.getById);
router.put('/:id',authorize("Admin"),GroupeResponsableActionController.updateGroupeResponsableAction);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
