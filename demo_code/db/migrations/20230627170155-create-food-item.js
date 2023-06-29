'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FoodItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false
      },
      vegan: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      vegetarian: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      glutenFree: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        unique: true
      },
      serviceTime: {
        type: Sequelize.STRING(25)
      },
      dishType: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FoodItems');
  }
};