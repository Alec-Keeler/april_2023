'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Insects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        //!!START SILENT
        // Bonus Bug 2: POSTGRES uses VAR CHAR(255) for DataTypes.STRING,
        // but SQLite does not enforce this character limit.
        // Change to DataTypes.TEXT to allow more characters.
        type: Sequelize.TEXT
        //!!END
        //!!ADD
        // type: Sequelize.STRING
        //!!END_ADD
      },
      fact: {
        type: Sequelize.STRING
      },
      territory: {
        type: Sequelize.STRING
      },
      millimeters: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    //!!START SILENT
    // Bonus Bug #1: Missing options argument in up function causes Insects
    // table to be created in public schema, not test_schema
    }, options);
    //!!END
    //!!ADD
    //});
    //!!END_ADD
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Insects', options);
  }
};
