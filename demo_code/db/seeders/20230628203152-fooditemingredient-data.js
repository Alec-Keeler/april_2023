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
    const { FoodItemIngredient, FoodItem, Ingredient } = require('../models')
    // await FoodItemIngredient.bulkCreate([
    //   { foodItemId: 2, ingredientId: 1 },
    //   { foodItemId: 3, ingredientId: 3 },
    //   { foodItemId: 4, ingredientId: 2 },
    //   // { foodItemId: 5, ingredientId: 2 },
    //   // { foodItemId: 6, ingredientId: 2 },
    //   // { foodItemId: 8, ingredientId: 2 },
    //   // { foodItemId: 4, ingredientId: 4 }
    // ], {validate: true})

    let list = [
      {
        ingredientName: 'Oreos',
        foodItemNames: ['Oreos']
      },
      {
        ingredientName: 'Moose Noses',
        foodItemNames: ['Dry-Aged Ribeye', 'Jellied Moose Nose']
      },
      {
        ingredientName: 'Butter',
        foodItemNames: ['Filet Mignon', 'Cajun Chicken Pasta', 'Chicken Tenders', 'Deep Fried Tarantulas']
      },
    ]
    for (let i = 0; i < list.length; i++) {
      const ele = list[i];
      const ingredient = await Ingredient.findOne({where: {name: ele.ingredientName}})
      const ingredientId = ingredient.id
      for (let j = 0; j < ele.foodItemNames.length; j++) {
        const foodName = ele.foodItemNames[j];
        const foodItem = await FoodItem.findOne({where: {name: foodName}})
        await FoodItemIngredient.create({
          ingredientId,
          foodItemId: foodItem.id
        })
      }
    }


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
