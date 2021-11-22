const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Movie = sequelize.define('Movie', {
  movieTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      max: 10,
    },
  },
  actorID: {
    type: DataTypes.INTEGER,
    references: { model: 'Actors', key: 'actorID' },
  },
  genreID: {
    type: DataTypes.INTEGER,
    references: { model: 'Genres', key: 'genreID' },
  },
});

module.exports = Movie;
