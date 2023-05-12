const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Actor, { through: "moviesActors" });
Actor.belongsToMany(Movie, { through: "moviesActors" });

Movie.belongsToMany(Director, { through: "moviesDirector" });
Director.belongsToMany(Movie, { through: "moviesDirector" });

Movie.belongsToMany(Genre, { through: "moviesGenre" });
Genre.belongsToMany(Movie, { through: "moviesGenre" });
