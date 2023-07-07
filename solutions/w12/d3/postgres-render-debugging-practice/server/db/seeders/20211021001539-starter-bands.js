'use strict';

const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

const bands = [
  { name: 'The Falling Box' },
  { name: 'America The Piano' },
  { name: 'Loved Autumn' },
  { name: 'Playin Sound' },
  { name: 'The King River' }
];

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
    options.tableName = 'Bands';
    await queryInterface.bulkInsert(options, bands)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bands';
    await queryInterface.bulkDelete(options, { [Op.or]: bands })
  }
};
