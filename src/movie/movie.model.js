const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  actorID: {
    type: DataTypes.INTEGER,
    references: {
      model: Actor,
      key: actorID,
    },
  },
});

module.exports = Movie;
