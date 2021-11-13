const { Op } = require('sequelize');

const Movie = require('./movie.model');
const Actor = require('../actor/actor.model');
const Genre = require('../genre/genre.model');

exports.addMovie = async movieObj => {
  try {
    if (movieObj.actorName) {
      const actor = await Actor.findOrCreate({
        where: {
          actorName: movieObj.actorName,
        },
      });

      movieObj.actorID = actor[0].dataValues.actorID;
    }

    if (movieObj.genreName) {
      const genre = await Genre.findOrCreate({
        where: {
          genreName: movieObj.genreName,
        },
      });

      movieObj.genreID = genre[0].dataValues.genreID;
    }

    await Movie.create(movieObj);

    console.log('Movie created successfully.');
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.listMovies = async () => {
  try {
    const movies = await Movie.findAll();

    if (movies.length < 1) {
      console.log(
        'No movies found, please use the addGenre command to add movies to the DB.'
      );
      return;
    }

    movies.forEach(({ dataValues }) => console.log(dataValues));
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.findMovie = async movieObj => {
  try {
    const foundMovie = await Movie.findOne({
      where: movieObj,
    });

    if (!foundMovie) {
      console.log('Movie not found.');
      return;
    }

    const {
      dataValues: { movieTitle, rating, actorID, genreID },
    } = foundMovie;

    const movie = { movieTitle };

    if (rating) movie.rating = rating;

    if (actorID) {
      const actor = await Actor.findOne({ where: { actorID: actorID } });

      movie.actorName = actor.dataValues.actorName;
    }

    if (genreID) {
      const genre = await Genre.findOne({ where: { genreID: genreID } });

      movie.genreName = genre.dataValues.genreName;
    }
    console.log(movie);
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.searchActor = async actorObj => {
  try {
    const actor = await Actor.findOne({ where: actorObj });

    if (!actor) {
      console.log('No Actor found with this name.');
      return;
    }

    const actorID = actor.dataValues.actorID;

    const movies = await Movie.findAll({
      where: { actorID: actorID },
      include: [
        { model: Actor, as: 'Actor', required: true },
        { model: Genre, as: 'Genre' },
      ],
    });

    movies.forEach(movie => {
      const movieDetails = {
        movieTitle: movie.dataValues.movieTitle,
        actorName: movie.dataValues.Actor.actorName,
      };

      if (movie.dataValues.rating)
        movieDetails.rating = movie.dataValues.rating;

      if (movie.dataValues.genreID)
        movieDetails.genreName = movie.dataValues.Genre.genreName;

      console.log(movieDetails);
    });
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.searchGenre = async genreObj => {
  try {
    const genre = await Genre.findOne({ where: genreObj });

    if (!genre) {
      console.log('No Genre found with this name.');
      return;
    }

    const genreID = genre.dataValues.genreID;

    const movies = await Movie.findAll({
      where: { genreID: genreID },
      include: [
        { model: Genre, as: 'Genre', required: true },
        { model: Actor, as: 'Actor' },
      ],
    });

    movies.forEach(movie => {
      const movieDetails = {
        movieTitle: movie.dataValues.movieTitle,
        genreName: movie.dataValues.Genre.genreName,
      };

      if (movie.dataValues.rating)
        movieDetails.rating = movie.dataValues.rating;

      if (movie.dataValues.actorID)
        movieDetails.actorName = movie.dataValues.Actor.actorName;

      console.log(movieDetails);
    });
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.searchRating = async rating => {
  try {
    const movies = await Movie.findAll({
      where: {
        rating: { [Op.gte]: rating },
      },
      include: [
        {
          model: Genre,
          as: 'Genre',
          where: { genreID: { [Op.not]: null } },
          required: false,
        },
        {
          model: Actor,
          as: 'Actor',
          where: { actorID: { [Op.not]: null } },
          required: false,
        },
      ],
      order: [['rating', 'DESC']],
    });

    if (!movies) {
      console.log(`No movies found with a rating of ${rating} or higher.`);
      return;
    }

    movies.forEach(movie => {
      const movieDetails = {
        movieTitle: movie.dataValues.movieTitle,
        rating: movie.dataValues.rating,
      };

      if (movie.actorID)
        movieDetails.actorName = movie.dataValues.Actor.actorName;
      if (movie.genreID)
        movieDetails.genreName = movie.dataValues.Genre.genreName;

      console.log(movieDetails);
    });
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.updateMovie = async (movieTitle, newDetails) => {
  try {
    const updateQuery = { where: { movieTitle: movieTitle } };
    const updateItems = {};
    if (newDetails.newTitle) updateItems.movieTitle = newDetails.newTitle;
    if (newDetails.newRating) updateItems.rating = newDetails.newRating;

    const updated = await Movie.update(updateItems, updateQuery);

    if (!updated[0]) {
      console.log('Update unsuccessful, please try again.');
      return;
    }

    const updatedObj = await Movie.findOne({
      where: { movieTitle: newDetails.newTitle || movieTitle },
    });

    console.log('Update successful: ', updatedObj.dataValues);
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.deleteMovie = async movieObj => {
  try {
    const deleted = await Movie.destroy({ where: movieObj });

    if (!deleted) {
      console.log('Deletion unsuccessful, please try again.');
      return;
    }

    console.log('Deletion successful.');
  } catch (err) {
    console.error('💥 💥', err);
  }
};
