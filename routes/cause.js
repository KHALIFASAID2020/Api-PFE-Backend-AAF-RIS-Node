var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var CauseController = require('../controllers/CauseController')
/* GET users listing. */
router.get('/',CauseController.getAllCause);
router.post('/AddCause/:id',CauseController.createCause);
router.delete('/:id',CauseController.deleteCause);
router.get('/:id',CauseController.getById);
router.put('/:id',CauseController.updateCause);
//router.get('/:id',companyController.updateCompany);
router.get('/getAllRootCauseByActionPlan/:id',CauseController.getAllRootCauseByActionPlan);

module.exports = router;

/* this.rootCauseService.getAllAnalysisMethod(`cause/getAllAnalysisMethod/${id}`).subscribe(result => {
 */