const jwt = require('jsonwebtoken');
const AppError = require('../../helpers/AppError');
const { catchAsync } = require('../../helpers/catchAsync');
const { Auth } = require('../../models');
const crypto = require('crypto');
const { Op } = require('sequelize');

const { all, findOne, update, destroy } = require('../Generic/FactoryGeneric');

const createToken = (user) => {
  return jwt.sign(user, process.env.SECRET_TOKEN, {
    expiresIn: '30d',
  });
};

const createSendToken = async (user, statusCode, res) => {
  const token = createToken({
    id: user.id,
    uuid: user.uuid,
    // role: user.role, no existe role todavia
    email: user.email,
    fullName: user.fullName,
    photo: user.photo,
  });

  return res.status(statusCode).json({
    status: 'success',
    ok: true,
    code: 200,
    token,
  });
};

exports.GetAll = all(Auth);
exports.GetById = findOne(Auth);

exports.SignUp = catchAsync(async (req, res, next) => {
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(req.body.password))
    return next(
      new AppError(
        'La contraseña debe contener al menos 8 y máximo 20 caracteres, incluidos al menos 1 mayúscula, 1 minúscula, un número y un carácter especial.',
        400
      )
    );

  const newUser = await Auth.create(req.body, { fields: ['email', 'password', 'fullName', 'uuid', 'photo'] });
  return res.json({
    status: 201,
    success: 'success',
    ok: true,
    message: 'El usuario fue creado con exito',
    data: newUser,
  });
  // createSendToken(newUser, 201, res);
});

exports.SignIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Proporcione un correo electrónico y una contraseña por favor.', 400));

  const user = await Auth.findOne({ where: { email } });

  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError('Correo y/o contraseña incorrectos.', 401));

  createSendToken(user, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email) return next(new AppError('El correo es requerido.', 404));

  const user = await Auth.findOne({ where: { email: req.body.email } });
  if (!user) return next(new AppError('Este no es un usuario con este correo electrónico.', 404));

  const resetToken = user.createPasswordResetToken();
  await user.save();

  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'Token sent successfully!',
    });
  } catch (err) {
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();
    return next(new AppError('Hubo un problema al intentar enviar el mail.', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //Get Uer based on the token
  if (!req.params.token) return next(new AppError('Token inválido o caducado.', 404));
  const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await Auth.findOne({
    where: { passwordResetToken: hashToken, passwordResetExpires: { [Op.gt]: Date.now() } },
  });

  if (!user) return next(new AppError('Este no es un usuario para este token. Token no válido o caducado.', 404));

  //validate user and token
  user.password = await user.hashPassword(req.body.password);
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();

  //Log in user again
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get the user
  const user = await Auth.findOne({ where: { email: req.user.email } });

  //check password
  if (!user || !(await user.checkPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Contraseña incorrecta', 401));
  }

  //update password
  user.password = await user.hashPassword(req.body.password);
  await user.save();

  createSendToken(user, 200, res);
});
