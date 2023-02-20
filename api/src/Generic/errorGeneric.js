const sendErrorDev = (err, res) => {
  return res.status(500).json({
    status: err.status,
    code: res.statusCode,
    message: err.message,
    error: err,
    stack: err?.stack,
  });
};
const sendErrorProd = (err, res) => {
  console.log(err);
  if (err.isOperational) {
    res.status(500).json({
      status: err.status,
      message: err.message,
      error: err,
    });
  } else {
    console.log('ERROR ', err);

    res.status(500).json({
      status: 'error',
      message: 'Algo salío mal. Por favor, intentalo de nuevo...',
      error: err,
    });
  }
};

const handleDuplicateFieldsDB = (error) => {
  const field = Object.keys(error.keyPattern)[0];
  const values = Object.values(error.keyValue)[0];
  const message = `Duplicate ${field} : ${values}`;
  return new Error(message);
};

const handleCastErrorDB = (error) => {
  const message = `Invalid ${error.path} : ${error.value}`;
  return new Error(message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new Error(message);
};
const handleJsonWebTokenError = () => new Error(`Token invalido. Por favor inicie sesión de nuevo!`);

const handleJWTExpiredToken = () => new Error('Su token ha caducado. Inicie sesión de nuevo por favor. ');

exports.globalErrorHandler = (err, req, res, next) => {

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);
    if (error.kind === 'ObjectId') error = handleCastErrorDB(error);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredToken();
    sendErrorProd(error, res);
  }
};
