var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var CauseController = require('../controllers/CauseController')
/* GET users listing. */
router.get('/',CauseController.getAllCause);
router.post('/AddCause',authorize("Admin"),CauseController.createCause);
router.delete('/:id',authorize("Admin"),CauseController.deleteCause);
router.get('/:id',authorize("Admin"),CauseController.getById);
router.put('/:id',authorize("Admin"),CauseController.updateCause);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
