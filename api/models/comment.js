'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    type: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    parent: DataTypes.INTEGER,
    totalWidth: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    images: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    tableName: 'Comments'
  });
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'createdBy',
      sourceKey: 'id'
    })
    Comment.belongsTo(models.Property, {
      as: 'property',
      foreignKey: 'itemId',
      sourceKey: 'id'
    })
  };
  return Comment;
};
