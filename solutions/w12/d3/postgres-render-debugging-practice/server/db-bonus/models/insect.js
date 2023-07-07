'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Insect.belongsToMany(
          models.Tree,
          //!!START SILENT
          // Bonus Bug #2: Missing foreignKey and otherKey in belongsToMany
          // association causes Sequelize to look for `TreeId` and `InsectId`
          { through: models.InsectTree,
            foreignKey: 'insectId',
            otherKey: 'treeId'
          }
          //!!END
          //!!ADD
          // { through: models.InsectTree }
          //!!END_ADD
      );
    }
  };
  Insect.init({
    name: DataTypes.STRING,
    //!!START SILENT
    // Bonus Bug 2: POSTGRES uses VAR CHAR(255) for DataTypes.STRING,
    // but SQLite does not enforce this character limit.
    // Change to DataTypes.TEXT to allow more characters.
    description: DataTypes.TEXT,
    //!!END
    //!!ADD
    // description: DataTypes.STRING,
    //!!END_ADD
    fact: DataTypes.STRING,
    territory: DataTypes.STRING,
    millimeters: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
      },
    }
  }, {
    sequelize,
    modelName: 'Insect',
  });
  return Insect;
};
