'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tree extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Tree.belongsToMany(
          models.Insect,
          //!!START SILENT
          // Bonus Bug #2: Missing foreignKey and otherKey in belongsToMany
          // association causes Sequelize to look for `TreeId` and `InsectId`
          { through: models.InsectTree,
            foreignKey: 'treeId',
            otherKey: 'insectId'
          }
          //!!END
          //!!ADD
          // { through: models.InsectTree }
          //!!END_ADD
      );
    }
  };
  Tree.init({
    tree: DataTypes.STRING,
    location: DataTypes.STRING,
    heightFt: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
      }
    },
    groundCircumferenceFt: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
      }
    }
  }, {
    sequelize,
    modelName: 'Tree',
  });
  return Tree;
};
