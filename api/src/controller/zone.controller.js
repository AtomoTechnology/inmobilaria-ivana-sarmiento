const { zone } = require('../../models');

const GetAll = (req, res) => {
  zone.findAll().then((result) => {
    res.json({
      code: 200,
      success: true,
      message: '',
      data: result,
    });
  });
};

const GetById = (req, res) => {
  const { id } = req.params;
  zone
    .findOne({
      where: {
        id: id,
      },
    })
    .then((result) => {
      res.json({
        code: 200,
        success: true,
        message: '',
        data: result,
      });
    });
};

const Post = (req, res) => {
  const { name } = req.body;
  zone
    .create({
      name: name,
      state: 1,
    })
    .then((response) => {
      return res.json({
        status: 200,
        success: true,
        message: 'La zona fue guardada con exito',
        data: response,
      });
    })
    .catch(function (err) {
      return res.json({
        status: 500,
        success: false,
        message: 'La zona no fue guardada',
        error: err,
      });
    });
};

const Put = (req, res) => {
  const { name } = req.body;
  zone
    .update(
      {
        name: name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((response) => {
      if (response[0] === 1) {
        return res.json({
          status: 200,
          success: true,
          message: 'La zona fue actualizada con exito',
          data: response,
        });
      } else {
        return res.json({
          status: 500,
          success: false,
          message: 'La zona no fue actualizada',
        });
      }
    })
    .catch((err) => {
      return res.json({
        status: 500,
        success: false,
        message: 'La zona no fue actualizada',
        error: err,
      });
    });
};

const Delete = (req, res) => {
  zone
    .destroy({ where: { id: req.params.id } })
    .then((response) => {
      if (response === 1) {
        return res.json({
          status: 200,
          success: true,
          message: 'La zona fue eliminada con exito',
        });
      } else {
        return res.json({
          status: 500,
          success: false,
          message: 'La zona no fue eliminada',
        });
      }
    })
    .catch((err) => {
      return res.json({
        status: 500,
        success: false,
        message: 'La zona no fue eliminada',
        error: err,
      });
    });
};

module.exports = { GetAll, GetById, Post, Put, Delete };
