const AppErrors = require('../utils/errorss/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppErrors(400, message);
};

const handleDuplicateFieldsDB = (errmsg) => {
  const value = errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value ${value}. Please use another value`;
  return new AppErrors(400, message);
};

const handleValidationErrorDB = (error) => {
  const errors = Object.values(error.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppErrors(400, message);
};

const handleJsonWebTokenError = (error) =>
  new AppErrors(401, 'Invalid Token. Please login again');

const sendErrForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrForProd = (err, res) => {
  // for operational errors / trusted errors send to client
 
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // for some unkknown errors
  } else {
  

    // Show generic message to client
    res.status(500).json({
      status: 'Error',
      message: 'Somthing went wrong',
    });
  }
};
const errorApp =  (err, req, res, next) => {
 
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message= err.message || "default message"
  if (process.env.NODE_ENV === 'development') {
    sendErrForDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    const { message, ...error } = err; // Destructure message property separately
    let modifiedError = { message, ...error }; // Assign message and rest of the properties to modifiedError

    console.log("err4",err.message)
    if (err.name === 'CastError') modifiedError = handleCastErrorDB(modifiedError);
    else if (err.code === 11000) modifiedError = handleDuplicateFieldsDB(err.errmsg);
    else if (err.name === 'ValidationError') modifiedError = handleValidationErrorDB(modifiedError);
    else if (err.name === 'JsonWebTokenError') modifiedError = handleJsonWebTokenError(modifiedError);
    sendErrForProd(modifiedError, res);
  }
};

module.exports = {
  errorApp,
};

