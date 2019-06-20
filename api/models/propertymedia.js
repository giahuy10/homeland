'use strict';
module.exports = (sequelize, DataTypes) => {
  const PropertyMedia = sequelize.define('PropertyMedia', {
    proId: DataTypes.INTEGER,
    source: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    height: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    width: DataTypes.INTEGER
  }, {});
  PropertyMedia.associate = function(models) {
    // associations can be defined here
  };
  return PropertyMedia;
};
