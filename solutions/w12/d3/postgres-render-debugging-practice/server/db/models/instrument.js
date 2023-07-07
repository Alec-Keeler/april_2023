'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Instrument.belongsToMany(
        models.Musician,
        //!!START SILENT
        // Basic Bug
        { through: models.MusicianInstrument,
          foreignKey: 'instrumentId',
          otherKey: 'musicianId'
        }
        //!!END
        //!!ADD
        // { through: models.MusicianInstrument }
        //!!END_ADD
      );
    }
  };
  Instrument.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Instrument',
  });
  return Instrument;
};
