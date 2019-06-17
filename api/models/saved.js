'use strict';
module.exports = (sequelize, DataTypes) => {
  const Saved = sequelize.define('Saved', {
    type: DataTypes.INTEGER, // 1: comment 2: news 3:property
    itemId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER
  }, {});
  Saved.associate = function(models) {
    // associations can be defined here
  };
  return Saved;
};
