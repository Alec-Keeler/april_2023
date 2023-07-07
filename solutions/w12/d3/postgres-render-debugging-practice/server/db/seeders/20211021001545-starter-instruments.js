'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Op } = require('sequelize');

const instruments = [
  { type: 'piano' },
  { type: 'guitar' },
  { type: 'drums' },
  { type: 'bass' },
  { type: 'violin' },
  { type: 'cello' },
  { type: 'trumpet' },
  { type: 'saxophone' }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Instruments';
    await queryInterface.bulkInsert(options, instruments)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Instruments';
    await queryInterface.bulkDelete(options, { [Op.or]: instruments })
  }
};
