const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Movie = sequelize.define('Movie', {
  title: {
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
});

module.exports = Movie;
