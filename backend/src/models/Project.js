const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  key: { type: String, required: true, uppercase: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['MANAGER', 'DEVELOPER', 'TESTER', 'VIEWER'] }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
