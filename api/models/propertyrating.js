'use strict';
module.exports = (sequelize, DataTypes) => {
  const PropertyRating = sequelize.define('PropertyRating', {
    proId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    location: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    progress: DataTypes.INTEGER,
    quality: DataTypes.INTEGER,
    design: DataTypes.INTEGER
  }, {
    tableName: 'PropertyRatings'
  });
  PropertyRating.associate = function(models) {
    // associations can be defined here
  };
  return PropertyRating;
};