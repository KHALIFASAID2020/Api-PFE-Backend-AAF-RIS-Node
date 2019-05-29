var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var AnalysisMethodController = require('../controllers/AnalysisMethodController');
/* GET users listing. */
router.get('/',AnalysisMethodController.getAllMethodAction);
router.post('/AddMethodAnalysis',authorize("Admin"),AnalysisMethodController.createAnalysisMethod);
router.delete('/:id',authorize("Admin"),AnalysisMethodController.deleteAnalysisMethod);
router.get('/:id',authorize("Admin"),AnalysisMethodController.getById);
router.put('/:id',authorize("Admin"),AnalysisMethodController.updateAnalysisMethod);
//router.get('/:id',companyController.updateCompany);

module.exports = router;
