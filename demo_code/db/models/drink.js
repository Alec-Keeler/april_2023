'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Drink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Drink.hasMany(models.FoodItem, {
        foreignKey: 'drinkId', // DrinkId
        onDelete: 'CASCADE',
        hooks: true
      })
    }

    // SELECT * FROM Drinks
    // JOIN FoodItems ON (Drinks.id = FoodItems.drinkId)
  }
  Drink.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    alcoholContent: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
    servingSizeOz: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Drink',
  });
  return Drink;
};