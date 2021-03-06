'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      hits: {
        type: Sequelize.INTEGER
      },
      saved: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      search: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.INTEGER
      },
      district: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER
      },
      typeOther: {
        type: Sequelize.STRING
      },
      owner: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      priceOther: {
        type: Sequelize.STRING
      },
      progress: {
        type: Sequelize.TEXT
      },
      overview: {
        type: Sequelize.TEXT
      },
      handover: {
        type: Sequelize.TEXT
      },
      product: {
        type: Sequelize.TEXT
      },
      facilities: {
        type: Sequelize.TEXT
      },
      map: {
        type: Sequelize.TEXT
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.INTEGER
      },
      totalWidth: {
        type: Sequelize.INTEGER
      },
      totalImages: {
        type: Sequelize.INTEGER
      },
      totalWidth2: {
        type: Sequelize.INTEGER
      },
      totalImages2: {
        type: Sequelize.INTEGER
      },
      totalComments: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Properties');
  }
};
