'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    dob: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.News, {
      as: 'news',
      foreignKey: 'createdBy',
      sourceKey: 'id'
    })
    User.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'createdBy',
      sourceKey: 'id'
    })
    User.hasMany(models.Property, {
      as: 'properties',
      foreignKey: 'createdBy',
      sourceKey: 'id'
    })
  };
  return User;
};