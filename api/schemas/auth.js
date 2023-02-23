const { DataTypes } = require('sequelize');
const { dbConnect } = require('./index');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const user = dbConnect.define(
  'user',
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El nombre no puede ser nulo.',
        },
        notEmpty: {
          msg: 'El nombre no puede ser vacio.',
        },
        len: {
          args: [3, 50],
          msg: 'El nombre debe tener entre 3 a 50 caracteres.',
        },
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        msg: 'Ya existe otra cuenta con ese correo.',
      },
      validate: {
        isEmail: {
          msg: 'Debe ingresar un correo valido.',
        },
        notNull: {
          msg: 'El correo no puede ser nulo.',
        },
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'La contraseña no puede ser nula.',
        },
        len: {
          args: [3, 50],
          msg: 'La contraseña debe tener entre 3 a 50 caracteres.',
        },
      },
    },
    passwordChangedAt: DataTypes.DATE,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
  },
  {
    tableName: 'users',
  }
);

user.beforeCreate(async (user, options) => {
  user.password = await bcrypt.hash(user.password, 12);
});

user.prototype.checkPassword = async function (userPassword, hash) {
  return await bcrypt.compare(userPassword, hash);
};
user.prototype.hashPassword = async function (password) {
  return await bcrypt.hash(password, 12);
};

user.prototype.changePasswordAfter = function (jwtIat) {
  if (this.passwordChangedAt) {
    const changePassword = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return jwtIat < changePassword;
  }
  return false;
};

user.prototype.createPasswordResetToken = function () {
  //create token
  const resetToken = crypto.randomBytes(32).toString('hex');
  //encrypt the token and save to the database
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  //store the time plus 10 mns to the satabase
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  //return the token without encrypt
  return resetToken;
};

module.exports = user;
