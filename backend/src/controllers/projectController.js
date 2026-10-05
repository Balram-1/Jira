const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const auditService = require('../services/auditService');

exports.createProject = async (req, res) => {
  const { name, description, key } = req.body;
  const project = await Project.create({
    name,
    description,
    key,
    owner: req.user._id,
    members: [{ user: req.user._id, role: 'MANAGER' }]
  });
  
  await auditService.log({ req, action: 'CREATE_PROJECT', resource: 'Project', resourceId: project._id });
  
  res.status(201).json({ success: true, data: project });
};

exports.getProjects = async (req, res) => {
  // Return projects where user is owner OR a member
  const projects = await Project.find({
    $or: [
      { owner: req.user._id },
      { 'members.user': req.user._id }
    ]
  }).populate('owner', 'name email');
  
  res.status(200).json({ success: true, data: projects });
};

exports.getProject = async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('owner', 'name email')
    .populate('members.user', 'name email');
    
  if (!project) {
    throw new AppError('Project not found', 404, 'NotFoundError');
  }
  
  const isMember = project.members.some(m => m.user._id.toString() === req.user._id.toString());
  if (!isMember && req.user.role !== 'ADMIN') {
    throw new AppError('Not authorized to view this project', 403, 'ForbiddenError');
  }
  
  res.status(200).json({ success: true, data: project });
};
