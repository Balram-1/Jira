const AuditLog = require('../models/AuditLog');
const logger = require('../utils/logger');

const auditService = {
  log: async ({ req, action, resource, resourceId, result = 'SUCCESS', meta = {} }) => {
    try {
      const logEntry = {
        userId: req.user ? req.user._id : null,
        userRole: req.user ? req.user.role : 'GUEST',
        action,
        resource,
        resourceId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        result,
        meta
      };
      
      await AuditLog.create(logEntry);
    } catch (error) {
      logger.error('Failed to write audit log:', error);
    }
  }
};

module.exports = auditService;
