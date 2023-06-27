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
  //  await queryInterface.bulkInsert('FoodItems', [
  //    { name: 'BBQ Brisket Sandwich', price: 12.99, vegan: false, vegetarian: false, glutenFree: false, serviceTime: 'lunch', description: 'Delicious smoked brisket smothered in our House BBQ Sauce', dishType: 'entree' },
  //    { name: 'Oreo', price: 5, vegan: true, vegetarian: true, glutenFree: true, serviceTime: 'snack', description: 'Classic chocolate sandwich cookies with a sweet and creamy filling', dishType: 'appetizer' },
  //    { name: 'Dry-Aged Ribeye', price: 35.99, vegan: false, vegetarian: false, glutenFree: true, serviceTime: 'dinner', description: 'Prime ribeye aged for 60 days for maximum flavor', dishType: 'entree' },
  //  ])
  const {FoodItem} = require('../models')
  await FoodItem.bulkCreate([
    { name: 'BBQ Brisket Sandwich', price: 12.99, vegan: false, vegetarian: false, glutenFree: false, serviceTime: 'lunch', description: 'Delicious smoked brisket smothered in our House BBQ Sauce', dishType: 'entree' },
    { name: 'Oreo', price: 5, vegan: true, vegetarian: true, glutenFree: true, serviceTime: 'snack', description: 'Classic chocolate sandwich cookies with a sweet and creamy filling', dishType: 'appetizer' },
    { name: 'Dry-Aged Ribeye', price: 35.99, vegan: false, vegetarian: false, glutenFree: true, serviceTime: 'dinner', description: 'Prime ribeye aged for 60 days for maximum flavor', dishType: 'entree' },
  ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('FoodItems', {
      name: ['BBQ Brisket Sandwich', 'Oreos', 'Dry-Aged Ribeye']
    }) // DELETE FROM FoodItems WHERE name IN (...);
  }
};
