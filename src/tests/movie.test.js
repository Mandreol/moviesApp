const request = require("supertest");
const app = require("../app"); // Reemplaza './app' con la ruta real de tu aplicación
const Director = require("../models/Director");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
require("../models");

let movieId = "";

test("POST /movies debe crear una película", async () => {
	const movie = {
		name: "nombre de la película",
		image: "aquí va la URL de la imagen",
		synopsis: "aquí va la descripción",
		releaseYear: 2023,
	};

	const res = await request(app).post("/movies").send(movie);
	movieId = res.body.id;
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
});

test("GET /movies debe traer la información de todas las películas", async () => {
	const res = await request(app).get("/movies");
	expect(res.status).toBe(200);
	expect(res.body.length).toBeGreaterThanOrEqual(1);
});

test("PUT /movies/:id debe modificar los atributos de la película correspondiente al ID", async () => {
	const movieUpdate = {
		image: "esta es otra URL",
	};
	const res = await request(app).put(`/movies/${movieId}`).send(movieUpdate);
	expect(res.status).toBe(200);
	expect(res.body.image).toBe(movieUpdate.image);
});

test("POST /movies/:id/actors debe agregar un actor a la película correspondiente al ID", async () => {
	const actor = await Actor.create({
		firstName: "Marco",
		lastName: "Andreola",
		nationality: "somewere",
		image: "aqui va la url",
		birthday: "2023-05-30",
	});
	const res = await request(app)
		.post(`/movies/${movieId}/actors`)
		.send([actor.id]);
	await actor.destroy();
	expect(res.status).toBe(200);
});

test("POST /movies/:id/directors debe agregar un director a la película correspondiente al ID", async () => {
	const director = await Director.create({
		firstName: "Marco",
		lastName: "Andreola",
		nationality: "somewere",
		image: "aqui va la url",
		birthday: "2023-05-30",
	});
	const res = await request(app)
		.post(`/movies/${movieId}/directors`)
		.send([director.id]);
	await director.destroy();

	expect(res.status).toBe(200);
});

test("POST /movies/:id/genres debe agregar un género a la película correspondiente al ID", async () => {
	const genre = await Genre.create({
		name: "nombre del género",
	});
	const res = await request(app)
		.post(`/movies/${movieId}/genres`)
		.send([genre.id]);
	await genre.destroy();
	expect(res.status).toBe(200);
});
test("DELETE /movies/:id debe eliminar la película correspondiente al ID", async () => {
	const res = await request(app).delete(`/movies/${movieId}`);
	expect(res.status).toBe(204);
});
