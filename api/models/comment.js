'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    type: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    parent: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};