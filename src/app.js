require('./db/connection');
const yargs = require('yargs');

const Movie = require('./movie/movie.model');
const Actor = require('./actor/actor.model');
const Genre = require('./genre/genre.model');
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

Actor.hasMany(Movie);
Movie.belongsTo(Actor);
Genre.hasMany(Movie);
Movie.belongsTo(Genre);

const app = () => {
  const command = process.argv[2];
  const argv = yargs.argv;

  if (command === 'addActor') {
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
