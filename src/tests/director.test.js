const request = require("supertest");
const app = require("../app.js");
require("../models");
let directorID = "";

test("POST /directors debe crear un director   ", async () => {
	const director = {
		firstName: "Marco",
		lastName: "Andreola",
		nationality: "somewere",
		image: "aqui va la url",
		birthday: "2023-05-30",
	};

	const res = await request(app).post("/directors").send(director);
	directorID = res.body.id;
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
});

test("GET/directors debe traer la información de todos los actores", async () => {
	const res = await request(app).get("/directors");
	expect(res.status).toBe(200);
	expect(res.body.length).toBeGreaterThanOrEqual(1);
});

test("PUT/directors/:id debe modificar los atributos del director   que corresponde al ide", async () => {
	const directorUpDate = {
		image: "esta es otra URL",
	};
	const res = await request(app)
		.put(`/directors/${directorID}`)
		.send(directorUpDate);
	expect(res.status).toBe(200);
	expect(res.body.image).toBe(directorUpDate.image);
});

test("DELETE/Actor/:id se debe eliminar el director con el id correspondiente", async () => {
	const res = await request(app).delete(`/directors/${directorID}`);
	expect(res.status).toBe(204);
});
