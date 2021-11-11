const Movie = require('./movie.model');

const addMovie = async movieObj => {
  try {
    await Movie.sync();
    await Movie.create(movieObj);
  } catch (err) {
    console.error('💥 💥', err);
  }
};
