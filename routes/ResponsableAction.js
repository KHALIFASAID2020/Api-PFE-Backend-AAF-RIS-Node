var express = require('express');
var router = express.Router();
const authorize = require('../_helpers/authorize');
//var Role = require('../_helpers/role');
var ResponsableController = require('../controllers/ResponsableActionController');
router.get('/',ResponsableController.getAllResponsableAction);
router.post('/createresponsable/:id',ResponsableController.createResponsableAction);
router.delete('/:id',ResponsableController.deleteResponsableAction);
router.get('/getAllResponsableByGroupAnalyse/:id',ResponsableController.getAllResponsableByGroupAnalyse);
router.get('/:id',ResponsableController.getById);

router.put('/:id',ResponsableController.updateResponsableAction);

module.exports = router;
