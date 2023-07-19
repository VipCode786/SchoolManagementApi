// auditLogModel.js

const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  operation_type: { type: String, required: true },
  timestamp: { type: Date, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  schema_name: { type: String, required: true },
  record_id: { type: mongoose.Schema.Types.ObjectId, required: true }
},
  {
    timestamps: true,
  }
  // Additional fields as needed
);

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
