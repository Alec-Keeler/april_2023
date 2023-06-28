'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ingredient.belongsToMany(models.FoodItem, {
        through: models.FoodItemIngredient,
        foreignKey: 'ingredientId',
        otherKey: 'foodItemId'
      })
      // SELECT * FROM Ingredients
      // JOIN FoodItemIngredients ON (FoodItemIngredients.ingredientId = Ingredients.id)
      // JOIN FoodItems ON (FoodItems.id = FoodItemIngredients.foodItemId)
    }
  }
  Ingredient.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: DataTypes.INTEGER,
    pricePerUnit: DataTypes.DECIMAL,
    storage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};