// logCrudOperation.js

const AuditLog = require('../../models/utils/auditLogSchema'); // Replace with the actual path to your AuditLog model




const auditLogFun = (operationType, schemaName) => {
  return async (req, res, next) => {
    try {
      // Save the result of the agent creation from the response object
      res.on('finish', async () => {
        // Get the created agent's _id from res.locals and check if it exists
        const recordId = res.locals.createdAgent ? res.locals.createdAgent._id : null;
        console.log("recordId-------------------", recordId);

        // Check if the result is valid and contains the "_id" field
        if (recordId) {
          // Assuming the operation succeeded and the record was created successfully
          const logData = {
            operation_type: operationType,
            timestamp: new Date(),
            // user_id: req.user._id, // Assuming you have the user ID in the request object
            schema_name: schemaName,
            record_id: recordId,
          };

          const logEntry = new AuditLog(logData);
          await logEntry.save();

          console.log('Audit log entry created:', logEntry);
        }
      });

      // Call next() to allow the request to continue to the "Create" operation
      next();
    } catch (err) {
      // Handle any errors that occurred during the log saving process
      console.error(err);
    }
  };
};




module.exports = auditLogFun;
