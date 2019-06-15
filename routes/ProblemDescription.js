var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var ProblemDescriptionController = require('../controllers/ProblemDescription');
router.get('/',ProblemDescriptionController.getAllProblemDescription);
router.post('/createdescription',ProblemDescriptionController.createProblemDescription);
router.delete('/:id',ProblemDescriptionController.deleteProblemDescription);
router.get('/:id',ProblemDescriptionController.getByIdProblemDescription);
router.put('/:id',ProblemDescriptionController.updateProblemDescription);

module.exports = router;
