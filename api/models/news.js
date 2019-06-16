'use strict';
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    title: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
    category: DataTypes.STRING,
    state: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    hits: DataTypes.INTEGER,
    saved: DataTypes.INTEGER
  }, {});
  News.associate = function(models) {
    // associations can be defined here
  };
  return News;
};
