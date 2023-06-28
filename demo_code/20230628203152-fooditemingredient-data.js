'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const { FoodItemIngredient } = require('../models')
    await FoodItemIngredient.bulkCreate([
      { foodItemId: 2, ingredientId: 1 },
      { foodItemId: 3, ingredientId: 3 },
      { foodItemId: 4, ingredientId: 2 },
      // { foodItemId: 5, ingredientId: 2 },
      // { foodItemId: 6, ingredientId: 2 },
      // { foodItemId: 8, ingredientId: 2 },
      // { foodItemId: 4, ingredientId: 4 }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('FoodItemIngredients')
  }
};
