const jwt = require('jsonwebtoken');
const AppError = require('../../helpers/AppError');
const encripto = require('../../helpers/Cryptographies');
const { Auth } = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

const SignIn = (req, res) => {
  const { email, password } = req.body;
  Auth
    .findOne({
      where: {
        email: email,
      },
    })
    .then((account) => {
      console.log('Account', account);
      if (!account) {
        return res.json({
            status: 500,
            success: false,
            message: 'No tiene un usuario creado para ese correo',
          });
      } else {
        encripto.compare(password, account.dataValues.password).then((response) => {
          if (!response) {            
              return res.json({
                status: 500,
                success: false,
                message: 'usuario y/o contraseña incorrecto',
              });
          } else {
            const token = jwt.sign(
              {
                id: account.dataValues.id,
                uid: account.dataValues.uuid,
                email: account.dataValues.email,
                fullName: account.dataValues.fullName,
                photo: account.dataValues.photo
              },
              process.env.SECRET_TOKEN,
              {
                expiresIn: 86400, // vence en un dia
              }
            );
            return res.json({
              status: 200,
              success: true,
              token: token,
            });
          }
        });
      }
    });
};

const GetAll = all(Auth);
const GetById = findOne(Auth)

const Post = (req, res, next) => {
  const { email, password, fullName, photo } = req.body;
  if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password))) {
    return next(new AppError("La contraseña debe contener al menos 8 y máximo 20 caracteres, incluidos al menos 1 mayúscula, 1 minúscula, un número y un carácter especial.", 400));
  }

  encripto.encryptPassword(password).then((pass) => {
    Auth
      .create({
        email: email,
        password: pass,
        fullName: fullName,
        photo: photo,
      })
      .then((response) => {
        return res.json({
          status: 200,
          success: true,
          message: 'El usuario fue creado con exito',
          data: response,
        });
      })
      .catch((err) => {
        console.log(err)
        return res.json({
          status: 500,
          success: false,
          message:
            err.errors[0].message == 'email must be unique'
              ? 'Ya existe un usuario con ese email'
              : ' no se pude crear el usuario',
          error: err,
        });
      });
  });
};
module.exports = { GetAll, GetById, Post, SignIn };
