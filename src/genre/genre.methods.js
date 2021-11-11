const Genre = require('./genre.model');

exports.addGenre = async genreObj => {
  try {
    await Genre.sync();
    await Genre.create(genreObj);
    console.log('Genre added successfully.');
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.listGenres = async () => {
  try {
    const genres = await Genre.findAll();

    if (genres.length < 1) {
      console.log(
        'No genres found, please use the addGenre command to add genres to the DB.'
      );
      return;
    }

    genres.forEach(({ dataValues }) => console.log(dataValues));
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.findGenre = async genreObj => {
  try {
    const genre = await Genre.findOne({ where: genreObj });

    if (!genre) {
      console.log('Genre not found.');
      return;
    }

    console.log(genre.dataValues);
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.updateGenre = async (oldName, newName) => {
  try {
    const updated = await Genre.update(newName, { where: oldName });

    if (!updated[0]) {
      console.log('Update unsuccessful, please try again.');
      return;
    }

    const updatedObj = await Genre.findOne({ where: newName });

    console.log('Update successful: ', updatedObj.dataValues);
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.deleteGenre = async genreObj => {
  try {
    const deleted = await Genre.destroy({ where: genreObj });

    if (!deleted) {
      console.log('Deletion unsuccessful, please try again.');
      return;
    }

    console.log('Deletion successful.');
  } catch (err) {
    console.error('💥 💥', err);
  }
};
