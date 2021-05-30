'use strict';
const model = require("../enums/db.models")

module.exports = (sequelize, DataTypes) => {
  const Jobs = sequelize.define(model.jobs, {
    jobName: DataTypes.STRING,
    description: DataTypes.TEXT,
    }, {});
  Jobs.associate = function(models) {
    // associations can be defined here
    Jobs.belongsTo(models.user,{as:'hr'});
    Jobs.hasMany(models.notes)
  };
  return Jobs;
};