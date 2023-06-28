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
    {name: 'BBQ Brisket Sandwich', price: 12.99, vegan: false, vegetarian: false, glutenFree: false, serviceTime: 'lunch', description: 'Delicious smoked brisket smothered in our House BBQ Sauce', dishType: 'entree' },
    {name: 'Oreo', price: 5, vegan: true, vegetarian: true, glutenFree: true, serviceTime: 'snack', description: 'Classic chocolate sandwich cookies with a sweet and creamy filling', dishType: 'appetizer' },
    {name: 'Dry-Aged Ribeye', price: 35.99, vegan: false, vegetarian: false, glutenFree: true, serviceTime: 'dinner', description: 'Prime ribeye aged for 60 days for maximum flavor', dishType: 'entree' },
    {name: 'Filet Mignon', price: 38.99, vegetarian: false, vegan: false, glutenFree: true, servieTime: 'dinner', description: '8 oz tenderloin steak cooked to perfection', dishType: 'entree'},
    {name: 'Cajun Chicken Pasta', price: 14.99, vegetarian: false, vegan: false, glutenFree: false, servieTime: 'dinner', description: 'A pasta dish with chicken and spicy alfredo sauce', dishType: 'entree'},
    {name: 'Chicken Tenders', price: 10, vegetarian: false, vegan: false, glutenFree: false, servieTime: ' all the time', description: 'everyones favorite', dishType: 'entree'},
    {name: 'Jellied Moose Nose', price: 14.99, vegetarian: false, vegan: false, glutenFree: true, servieTime: 'dinner', description: 'Canadian delicacy made from the snout of a moose, cooked and cooled in a brothy liquid', dishType: 'appetizer'},
    {name: 'Deep Fried Tarantulas', price: 15.99, vegetarian: false, vegan: false, glutenFree: true, servieTime: 'dinner', description: 'A Cambodian delicacy - crispy fried tarantulas served with a tangy lime and black pepper dip', dishType: 'exotic'}
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
