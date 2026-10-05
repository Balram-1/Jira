const express = require('express');
const projectController = require('../controllers/projectController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.use(authenticate);

router.post('/', authorize('ADMIN', 'MANAGER'), projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProject);

module.exports = router;
