'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      PropertyId: {
        type: Sequelize.INTEGER
      },
      ClientId: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      nroPartWater: {
        type: Sequelize.STRING
      },
      nroPartMuni: {
        type: Sequelize.STRING
      },
      nroPartAPI: {
        type: Sequelize.STRING
      },
      commision: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      stamped: {
        type: Sequelize.STRING
      },
      fees: {
        type: Sequelize.STRING
      },
      warrantyInquiry: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contracts');
  }
};