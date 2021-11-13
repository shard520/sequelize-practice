require('./db/connection');
const yargs = require('yargs');
const Actor = require('./actor/actor.model');
const Genre = require('./genre/genre.model');
const Movie = require('./movie/movie.model');

const {
  addActor,
  listActors,
  findActor,
  updateActor,
  deleteActor,
} = require('./actor/actor.methods');
const {
  addGenre,
  listGenres,
  findGenre,
  updateGenre,
  deleteGenre,
} = require('./genre/genre.methods');
const {
  addMovie,
  listMovies,
  findMovie,
  searchActor,
  searchGenre,
  searchRating,
  updateMovie,
  deleteMovie,
} = require('./movie/movie.methods');

const app = async () => {
  const command = process.argv[2];
  const argv = yargs.argv;

  await Actor.sync();
  await Genre.sync();
  await Movie.sync();

  Actor.Movie = Actor.hasMany(Movie, { foreignKey: 'actorID' });
  Movie.Actor = Movie.belongsTo(Actor, {
    foreignKey: 'actorID',
  });
  Genre.Movie = Genre.hasMany(Movie, { foreignKey: 'genreID' });
  Movie.Genre = Movie.belongsTo(Genre, {
    foreignKey: 'genreID',
  });

  if (command === 'addMovie') {
    addMovie({
      movieTitle: argv.movieTitle,
      actorName: argv.actorName,
      genreName: argv.genreName,
      rating: argv.rating,
    });
  } else if (command === 'listMovies') {
    listMovies();
  } else if (command === 'searchMovie') {
    findMovie({ movieTitle: argv.movieTitle });
  } else if (command === 'searchActor') {
    searchActor({ actorName: argv.actorName });
  } else if (command === 'searchGenre') {
    searchGenre({ genreName: argv.genreName });
  } else if (command === 'searchRating') {
    searchRating(argv.minRating);
  } else if (command === 'updateMovie') {
    updateMovie(argv.movieTitle, {
      newTitle: argv.newTitle,
      newRating: argv.newRating,
    });
  } else if (command === 'deleteMovie') {
    deleteMovie({ movieTitle: argv.movieTitle });
  } else if (command === 'addActor') {
    addActor({ actorName: argv.actorName });
  } else if (command === 'listActors') {
    listActors();
  } else if (command === 'findActor') {
    findActor({ actorName: argv.actorName });
  } else if (command === 'updateActor') {
    updateActor(
      { actorName: argv.actorName },
      { actorName: argv.newActorName }
    );
  } else if (command === 'deleteActor') {
    deleteActor({ actorName: argv.actorName });
  } else if (command === 'addGenre') {
    addGenre({ genreName: argv.genreName });
  } else if (command === 'listGenres') {
    listGenres();
  } else if (command === 'findGenre') {
    findGenre({ genreName: argv.genreName });
  } else if (command === 'updateGenre') {
    updateGenre(
      { genreName: argv.genreName },
      { genreName: argv.newGenreName }
    );
  } else if (command === 'deleteGenre') {
    deleteGenre({ genreName: argv.genreName });
  } else {
    console.log('Incorrect command.');
    return;
  }
};

app();
