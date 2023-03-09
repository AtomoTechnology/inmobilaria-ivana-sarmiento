const AppError = require('../../helpers/AppError');

const handleSequelizeValidationError = (error) => new AppError(error.errors.map((e) => e.message).join(',,'), 400);
const handleSequelizeForeignKeyConstraintError = (error) =>
  new AppError(
    `Hay problema con la(s) clave(s) foránea(s) (${error.fields?.join(',')}) de la tabla ${
      error?.table
    }. Asegúrese de enviar los datos correctamente.`,
    400
  );
const handleSequelizeUniqueConstraintErrorContract = (error) =>
  new AppError(
    'Ese inquilino ya tiene un contracto vigente para esa propiedad dentro de ese mismo rango de fecha.',
    400
  );
const handleSequelizeUniqueConstraintErrorVisit = (error) =>
  new AppError(
    'Esta persona ya tiene una visita pactada para esa propiedad con esa fecha.',
    400
  );
const handleSequelizeUniqueConstraintError = (error) =>
  new AppError(error.errors.map((e) => e.message).join(',,'), 400);

const handleJsonWebTokenError = () => new AppError(`Token  no valido. Inicia sesión de nuevo.`, 401);
const handleJWTExpiredToken = () => new AppError('Su token ha caducado. Vuelva a iniciar sesión, por favor.', 401);
const handleSequelizeAccessDeniedError = () =>
  new AppError(
    'Error al intentar conectarse a la base de datos. Verifica que todos los datos de conexión esten correctos.',
    401
  );

const sendError = (err, res) => {
  if (process.env.NODE_ENV !== 'production') {
    return res.status(err.statusCode).json({
      ok: false,
      status: err.status,
      message: err.message.split(',,')[0],
      errors: err.message.split(',,'),
      error: {
        ...err,
        message: err.message
      },
      stack: err.stack,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      ok: false,
      status: err.status,
      message: err.message.split(',,')[0],
      errors: err.message.split(',,'),
      code: err.statusCode,
    });
  }

  return res
    .status(500)
    .json({
      ok: false,
      status: 'error',
      code: 500,
      message: '¡¡Algo salió  mal!! Por favor, inténtalo de nuevo.'
    });
};

exports.globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  let error = Object.assign(err);
  // console.log("error.errors", error.errors[0].message)
  // console.log(error.name);
  if (error.errors !== undefined) {
    if (error.errors[0].message === 'contracts__property_id__client_id_start_date_end_date must be unique')
      error = handleSequelizeUniqueConstraintErrorContract(error);
    if (error.errors[0].message === 'visits__property_id_date_phone_full_name must be unique') {
      error = handleSequelizeUniqueConstraintErrorVisit(error);
    }
  }
  if (error.name === 'SequelizeAccessDeniedError') error = handleSequelizeAccessDeniedError();
  if (error.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredToken();
  if (error.name === 'SequelizeValidationError') error = handleSequelizeValidationError(error);
  if (error.name === 'SequelizeUniqueConstraintError') error = handleSequelizeUniqueConstraintError(error);

  if (error.name === 'SequelizeForeignKeyConstraintError') error = handleSequelizeForeignKeyConstraintError(error);
  sendError(error, res);
};