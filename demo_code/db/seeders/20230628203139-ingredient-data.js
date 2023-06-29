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
   const { Ingredient } = require('../models')
    await Ingredient.bulkCreate([
      { name: 'Oreos', quantity: 10, pricePerUnit: 4.39, storage: 'dry' },
      { name: 'Butter', quantity: 50, pricePerUnit: 3.50, storage: 'cold' },
      { name: 'Moose Noses', quantity: 300, pricePerUnit: 9.99, storage: 'cold' },
      { name: 'Kangaroo Steak', quantity: 1, pricePerUnit: 25.00, storage: 'frozen' }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Ingredients')
  }
};
