class AppError extends Error {
  constructor(message: string, statusCode: number) {
    //because the constructor of error need the message parameter
    super(message);
    // Error.

    // this.statusCode = statusCode;
    // this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
