const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userRole: { type: String },
  action: { type: String, required: true },
  resource: { type: String },
  resourceId: { type: mongoose.Schema.Types.ObjectId },
  ipAddress: { type: String },
  userAgent: { type: String },
  result: { type: String, enum: ['SUCCESS', 'FAILURE'], default: 'SUCCESS' },
  meta: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
