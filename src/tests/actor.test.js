const request = require("supertest")
const app = require("../app")

const URL_ACTORS = '/api/v1/actors'

let actorId

const actor = {
    firstName: "Jackie",
    lastName: "Chan",
    nationality: "USA",
    image: "https://es.web.img3.acsta.net/c_310_420/pictures/16/01/07/16/44/109721.jpg",
    birthday: "1954-04-07"
}

test("POST -> 'URL_ACTORS', should return status code 201 and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .post(URL_ACTORS)
        .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("GET -> 'URL_ACTORS', should return status code 200 and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
        .get(URL_ACTORS)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> 'URL_ACTORS/:id', should return status code 200 and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .get(`${URL_ACTORS}/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("PUT -> 'URL_ACTORS/:id', should return status code 200 and res.body.firstName === firstNameUpdate.firstName", async () => {
    const firstNameUpdate = {
        firstName: "Jhon"
    }
    
    const res = await request(app)
        .put(`${URL_ACTORS}/${actorId}`)
        .send(firstNameUpdate)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(firstNameUpdate.firstName)
})

test("DELETE -> 'URL_ACTORS/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${URL_ACTORS}/${actorId}`)

    expect(res.status).toBe(204)
})