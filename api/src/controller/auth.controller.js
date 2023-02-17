const jwt = require('jsonwebtoken');
const encripto = require('../../helpers/Cryptographies');
const { auth } = require('../../models');

const SignIn = (req, res) => {
  const { email, password } = req.body;
  auth
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
              '6a698217-a233-40da-a643-72367ff09e89',
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

const GetAll = (req, res) => {
  auth
    .findAll({
      attributes: ['id', 'uuid', 'email','fullName','photo'],
      order: [['id', 'DESC']],
    })
    .then((result) => {
      return res.json({
        status: 200,
        success: true,
        message: '',
        data: result,
      });
    });
};

const GetById = (req, res) => {
  auth
    .findOne({
      attributes: ['id', 'uuid', 'email','fullName','photo'],
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      return res.json({
        status: 200,
        success: true,
        message: '',
        data: result,
      });
    });
};

const Post = (req, res) => {
  const { email, password,fullName,photo } = req.body;
  encripto.encryptPassword(password).then((pass) => {
    auth
      .create({
        email: email,
        password: pass,
        fullName:fullName,
        photo: photo
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
