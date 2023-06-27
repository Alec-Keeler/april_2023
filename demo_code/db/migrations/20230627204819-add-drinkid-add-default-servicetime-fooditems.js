'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('FoodItems', 'drinkId', {
      type: Sequelize.INTEGER
    })

    await queryInterface.addConstraint('FoodItems', {
      fields: ['serviceTime'],
      type: 'unique',
      name: 'idx_unique_fooditems_servicetime'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('FoodItems', 'drinkId')
    await queryInterface.removeConstraint('FoodItems', 'idx_unique_fooditems_servicetime')
  }
};
