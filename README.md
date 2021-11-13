# Contents

- [Movies](#Movies)
- [Actors](#Actors)
- [Genres](#Genres)

---

## Movies

To add a movie with all available options (movie title is the only required option):

`node src/app.js addMovie --movieTitle="The Matrix" --actorName="Keanu Reeves" --genreName="Sci-fi" --rating=9`

---

To view a list of movies:

`node src/app.js listMovies`

To search the database, you can search by movie title, actor, genre, or min rating using the following commands:

`node src/app.js searchMovie --movieTitle="The Matrix"`

`node src/app.js searchActor --actorName="Keanu Reeves"`

`node src/app.js searchGenre --genreName="Sci-fi"`

`node src/app.js searchRating --minRating="7"`

These commands will either return a single movie or a list of movies that match the search terms. Searching by min rating with return the list with the movies rated from highest to lowest.

---

To update a movie title or rating, select the movie title and pass the new title and/or rating. To update an actor or genre use their dedicated commands:

`node src/app.js updateMovie --movieTitle="Speeed" --newTitle="Speed" --newRating="7"`

---

To delete a movie:

`node src/app.js deleteMovie --movieTitle="Johnny Mnemonic"`

---

## Actors

To add an actor:

`node src/app.js addActor --actorName="David Bowie"`

---

To view a list of actors:

`node src/app.js listActors`

To find one actor:

`node src/app.js findActor --actorName="Henry Winkler"`

---

To update an actor, pass the old name followed by the new name:

`node src/app.js updateActor --actorName="Billl Murrey" --newActorName="Bill Murray"`

---

To delete an actor:

`node src/app.js deleteActor --actorName="Bill Murray"`

## Genres

All genre commands work the same as the commands for actors, just replace Actor with Genre, eg:

`node src/app.js findGenre --genreName="Comedy"`
