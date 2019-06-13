'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
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
    // associations can be defined here
  };
  return User;
};