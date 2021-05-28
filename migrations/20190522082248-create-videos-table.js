const db = require('../models');

module.exports = {
  up: () => db.Video.sync(),

  down: queryInterface => queryInterface.dropTable(db.Video.tableName),
};
