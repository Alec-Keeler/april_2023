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
   const { Drink } = require('../models')
   await Drink.bulkCreate(
     [
       { name: 'Apple Juice', type: 'juice', alcoholContent: 0, price: 6, servingSizeOz: 12 },
       { name: 'Anett Bianco', type: 'wine', alcoholContent: 12.5, price: 16, servingSizeOz: 12.3 },
       { name: 'Lemonade', type: 'juice', alcoholContent: 0, price: 7, servingSizeOz: 12 },
       { name: 'Snake Wine', type: 'Rice Wine', alcoholContent: 15, price: 30, servingSizeOz: 3 },
       { name: 'Tap Water', type: 'water', alcoholContent: 0, price: 22, servingSizeOz: 8 },
       { name: 'Matcha', type: 'tea', alcoholContent: 0, price: 6, servingSizeOz: 8 },
       { name: 'Earl Grey', type: 'tea', alcoholContent: 0, price: 4, servingSizeOz: 8 },
       { name: 'Sourtoe Cocktail', type: 'shot', alcoholContent: 40, price: 20, servingSizeOz: 1 },
       { name: 'Long Island Ice Tea', type: 'cocktail', alcoholContent: 22, price: 12.00, servingSizeOz: 16 }
     ], {validate: true}
   )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Drinks')
  }
};
