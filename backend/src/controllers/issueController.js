const Issue = require('../models/Issue');
const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const auditService = require('../services/auditService');

exports.createIssue = async (req, res) => {
  const { title, description, project, status, priority, assignee } = req.body;
  
  // Verify project exists
  const proj = await Project.findById(project);
  if (!proj) throw new AppError('Project not found', 404, 'NotFoundError');
  
  const issue = await Issue.create({
    title, description, project, status, priority, assignee, reporter: req.user._id
  });
  
  await auditService.log({ req, action: 'CREATE_ISSUE', resource: 'Issue', resourceId: issue._id });
  
  res.status(201).json({ success: true, data: issue });
};

exports.getIssues = async (req, res) => {
  const { projectId } = req.query;
  const filter = {};
  if (projectId) filter.project = projectId;
  
  const issues = await Issue.find(filter)
    .populate('assignee', 'name email')
    .populate('reporter', 'name email')
    .populate('project', 'name key');
    
  res.status(200).json({ success: true, data: issues });
};
