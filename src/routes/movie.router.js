const {
	getAll,
	create,
	getOne,
	remove,
	update,
	setMovieActors,
	setMovieDirectors,
	setMovieGenres,
} = require("../controllers/movie.controllers");
const express = require("express");

const routerMovie = express.Router();

routerMovie.route("/").get(getAll).post(create);

routerMovie.route("/:id").get(getOne).delete(remove).put(update);
routerMovie.route("/:id/actors").post(setMovieActors);
routerMovie.route("/:id/directors").post(setMovieDirectors);
routerMovie.route("/:id/genres").post(setMovieGenres);

module.exports = routerMovie;
