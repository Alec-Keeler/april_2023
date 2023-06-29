'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FoodItemIngredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foodItemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'FoodItems',
          onDelete: 'CASCADE'
        }
      },
      ingredientId: { // ingredientId INTEGER REFERENCES ingredients(id)
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ingredients',
          onDelete: 'CASCADE'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FoodItemIngredients');
  }
};