'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  //  await queryInterface.bulkInsert('FoodItems', [
  //    { name: 'BBQ Brisket Sandwich', price: 12.99, vegan: false, vegetarian: false, glutenFree: false, serviceTime: 'lunch', description: 'Delicious smoked brisket smothered in our House BBQ Sauce', dishType: 'entree' },
  //    { name: 'Oreo', price: 5, vegan: true, vegetarian: true, glutenFree: true, serviceTime: 'snack', description: 'Classic chocolate sandwich cookies with a sweet and creamy filling', dishType: 'appetizer' },
  //    { name: 'Dry-Aged Ribeye', price: 35.99, vegan: false, vegetarian: false, glutenFree: true, serviceTime: 'dinner', description: 'Prime ribeye aged for 60 days for maximum flavor', dishType: 'entree' },
  //  ])
  const {FoodItem, Drink} = require('../models')
  // await FoodItem.bulkCreate([
  //   {drinkId: 1, name: 'BBQ Brisket Sandwich', price: 12.99, vegan: false, vegetarian: false, glutenFree: false, serviceTime: 'lunch', description: 'Delicious smoked brisket smothered in our House BBQ Sauce', dishType: 'entree' },
  //   {drinkId: 2, name: 'Oreos', price: 5, vegan: true, vegetarian: true, glutenFree: true, serviceTime: 'snack', description: 'Classic chocolate sandwich cookies with a sweet and creamy filling', dishType: 'appetizer' },
  //   {drinkId: 3, name: 'Dry-Aged Ribeye', price: 35.99, vegan: false, vegetarian: false, glutenFree: true, serviceTime: 'dinner', description: 'Prime ribeye aged for 60 days for maximum flavor', dishType: 'entree' },
  //   {drinkId: 4, name: 'Filet Mignon', price: 38.99, vegetarian: false, vegan: false, glutenFree: true, servieTime: 'dinner', description: '8 oz tenderloin steak cooked to perfection', dishType: 'entree'},
  //   {drinkId: 1, name: 'Cajun Chicken Pasta', price: 14.99, vegetarian: false, vegan: false, glutenFree: false, servieTime: 'dinner', description: 'A pasta dish with chicken and spicy alfredo sauce', dishType: 'entree'},
  //   {drinkId: 6, name: 'Chicken Tenders', price: 10, vegetarian: false, vegan: false, glutenFree: false, servieTime: ' all the time', description: 'everyones favorite', dishType: 'entree'},
  //   {drinkId: 8, name: 'Jellied Moose Nose', price: 14.99, vegetarian: false, vegan: false, glutenFree: true, servieTime: 'dinner', description: 'Canadian delicacy made from the snout of a moose, cooked and cooled in a brothy liquid', dishType: 'appetizer'},
  //   {drinkId: 2, name: 'Deep Fried Tarantulas', price: 15.99, vegetarian: false, vegan: false, glutenFree: true, servieTime: 'dinner', description: 'A Cambodian delicacy - crispy fried tarantulas served with a tangy lime and black pepper dip', dishType: 'exotic'}
  // ], {validate: true})

    let dynamicFood = [
      {
        drinkName: 'Apple Juice',
        food: [
          { name: 'BBQ Brisket Sandwich', price: 12.99, vegan: false, vegetarian: false, glutenFree: false, serviceTime: 'lunch', description: 'Delicious smoked brisket smothered in our House BBQ Sauce', dishType: 'entree' },
          { name: 'Cajun Chicken Pasta', price: 14.99, vegetarian: false, vegan: false, glutenFree: false, servieTime: 'dinner', description: 'A pasta dish with chicken and spicy alfredo sauce', dishType: 'entree' },
        ]
      },
      {
        drinkName: 'Anett Bianco',
        food: [
          { name: 'Oreos', price: 5, vegan: true, vegetarian: true, glutenFree: true, serviceTime: 'snack', description: 'Classic chocolate sandwich cookies with a sweet and creamy filling', dishType: 'appetizer' },
          { name: 'Deep Fried Tarantulas', price: 15.99, vegetarian: false, vegan: false, glutenFree: true, servieTime: 'dinner', description: 'A Cambodian delicacy - crispy fried tarantulas served with a tangy lime and black pepper dip', dishType: 'exotic' }
        ]
      }
    ]
    for (let i = 0; i < dynamicFood.length; i++) {
      const drinkObj = dynamicFood[i];
      const drink = await Drink.findOne({
        where: {name: drinkObj.drinkName}
      })
      for (let j = 0; j < drinkObj.food.length; j++) {
        const food = drinkObj.food[j];
        await drink.createFoodItem(food)
        // await FoodItem.create({drinkId: drink.id})
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
    await queryInterface.bulkDelete('FoodItems')
    // await queryInterface.bulkDelete('FoodItems', {
    //   name: ['BBQ Brisket Sandwich', 'Oreos', 'Dry-Aged Ribeye']
    // }) // DELETE FROM FoodItems WHERE name IN (...);
  }
};
