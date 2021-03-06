'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    hits: DataTypes.INTEGER,
    saved: DataTypes.INTEGER,
    location: DataTypes.STRING,
    city: DataTypes.INTEGER,
    district: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    typeOther: DataTypes.STRING,
    progressText: DataTypes.STRING,
    owner: DataTypes.STRING,
    price: DataTypes.INTEGER,
    priceOther: DataTypes.STRING,
    progress: DataTypes.TEXT,
    overview: DataTypes.TEXT,
    product: DataTypes.TEXT,
    facilities: DataTypes.TEXT,
    handover: DataTypes.TEXT,
    search: DataTypes.TEXT,
    map: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    totalWidth: DataTypes.INTEGER,
    totalImages: DataTypes.INTEGER,
    totalWidth2: DataTypes.INTEGER,
    totalImages2: DataTypes.INTEGER,
    totalComments: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING

  }, {
    tableName: 'Properties'
  });
  Property.associate = function(models) {
    // associations can be defined here
    Property.hasMany(models.PropertyMedia, {
      as: 'images',
      foreignKey: 'proId',
      sourceKey: 'id'
    })
    Property.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'itemId',
      sourceKey: 'id'
    })
  };
  return Property;
};
