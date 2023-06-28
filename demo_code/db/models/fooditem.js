'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FoodItem.belongsTo(models.Drink, {
        foreignKey: 'drinkId'
      })
      // SELECT * FROM FoodItems
      // JOIN Drinks ON (FoodItems.drinkId = Drinks.id)
      // hasMany, belongsTo, belongsToMany

      FoodItem.belongsToMany(models.Ingredient, {
        through: models.FoodItemIngredient,
        foreignKey: 'foodItemId',
        otherKey: 'ingredientId'
      })
      // SELECT * FROM FoodItems
      // JOIN FoodItemIngredients ON (FoodItems.id = FoodItemIngredients.foodItemId)
      // JOIN Ingredients ON (FoodItemIngredients.ingredientId = Ingredients.id)
    }


  }
  FoodItem.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [5, 100],
          msg: 'The name must be between 5 and 100 characters please :)'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    vegan: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    vegetarian: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    glutenFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    serviceTime: {
      type: DataTypes.STRING
    },
    dishType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drinkId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'FoodItem',
  });
  return FoodItem;
};