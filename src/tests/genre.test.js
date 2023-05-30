const request = require("supertest");
const app = require("../app.js");
require("../models");
let genreId = "";

test("POST /genres debe crear un genre", async () => {
	const genre = {
		name: "acción",
	};

	const res = await request(app).post("/genres").send(genre);
	genreId = res.body.id;
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
});

test("GET/genres debe traer la información de todos los actores", async () => {
	const res = await request(app).get("/genres");
	expect(res.status).toBe(200);
	expect(res.body.length).toBeGreaterThanOrEqual(1);
});

test("PUT/genres/:id debe modificar los atributos del genre que corresponde al ide", async () => {
	const genreUpDate = {
		name: "terror",
	};
	const res = await request(app).put(`/genres/${genreId}`).send(genreUpDate);
	expect(res.status).toBe(200);
	expect(res.body.name).toBe(genreUpDate.name);
});

test("DELETE/Actor/:id se debe eliminar el genre con el id correspondiente", async () => {
	const res = await request(app).delete(`/genres/${genreId}`);
	expect(res.status).toBe(204);
});
