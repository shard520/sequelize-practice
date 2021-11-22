const Actor = require('./actor.model');

exports.addActor = async actorObj => {
  try {
    await Actor.create(actorObj);
    console.log('Actor added successfully.');
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.listActors = async () => {
  try {
    const actors = await Actor.findAll();

    if (actors.length < 1) {
      console.log(
        'No actors found, please use the addActor command to add actors to the DB.'
      );
      return;
    }

    actors.forEach(({ dataValues }) => console.log(dataValues));
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.findActor = async actorObj => {
  try {
    const actor = await Actor.findOne({ where: actorObj });

    if (!actor) {
      console.log('Actor not found.');
      return;
    }

    console.log(actor.dataValues);
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.updateActor = async (oldName, newName) => {
  try {
    const updated = await Actor.update(newName, { where: oldName });

    if (!updated[0]) {
      console.log('Update unsuccessful, please try again.');
      return;
    }

    const updatedObj = await Actor.findOne({ where: newName });

    console.log('Update successful: ', updatedObj.dataValues);
  } catch (err) {
    console.error('💥 💥', err);
  }
};

exports.deleteActor = async actorObj => {
  try {
    const deleted = await Actor.destroy({ where: actorObj });

    if (!deleted) {
      console.log('Deletion unsuccessful, please try again.');
      return;
    }

    console.log('Deletion successful.');
  } catch (err) {
    console.error('💥 💥', err);
  }
};
