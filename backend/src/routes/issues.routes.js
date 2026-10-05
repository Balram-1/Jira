const express = require('express');
const issueController = require('../controllers/issueController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.use(authenticate);

router.post('/', issueController.createIssue);
router.get('/', issueController.getIssues);

module.exports = router;
