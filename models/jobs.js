'use strict';
const model = require("../enums/db.models")

module.exports = (sequelize, DataTypes) => {
  const Jobs = sequelize.define(model.jobs, {
    jobName: DataTypes.STRING,
    description: DataTypes.TEXT,
    note: DataTypes.TEXT
    }, {});
  Jobs.associate = function(models) {
    // associations can be defined here
    Jobs.belongsTo(models.user,{as:'hr'});
    Jobs.belongsTo(models.user,{as:'client'});
  };
  return Jobs;
};