'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    createdBy: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    typeItem: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    note: DataTypes.TEXT
  }, {});
  Activity.associate = function(models) {
    // associations can be defined here
  };
  return Activity;
};
