const request = require("supertest");
const app = require("../app.js");
require("../models");
let actorId = "";

test("POST /actors debe crear un actor", async () => {
	const actor = {
		firstName: "Marco",
		lastName: "Andreola",
		nationality: "somewere",
		image: "aqui va la url",
		birthday: "2023-05-30",
	};

	const res = await request(app).post("/actors").send(actor);
	actorId = res.body.id;
	expect(res.status).toBe(201);
	expect(res.body.id).toBeDefined();
});

test("GET/actors debe traer la información de todos los actores", async () => {
	const res = await request(app).get("/actors");
	expect(res.status).toBe(200);
	expect(res.body.length).toBeGreaterThanOrEqual(1);
});

test("PUT/actors/:id debe modificar los atributos del actor que corresponde al ide", async () => {
	const actorUpDate = {
		image: "esta es otra URL",
	};
	const res = await request(app).put(`/actors/${actorId}`).send(actorUpDate);
	expect(res.status).toBe(200);
	expect(res.body.image).toBe(actorUpDate.image);
});

test("DELETE/Actor/:id se debe eliminar el actor con el id correspondiente", async () => {
	const res = await request(app).delete(`/actors/${actorId}`);
	expect(res.status).toBe(204);
});
