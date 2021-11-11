# Contents

- [Actors](#Actors)
- [Genres](#Genres)

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
