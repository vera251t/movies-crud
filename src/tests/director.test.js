const request = require("supertest")
const app = require("../app")

const URL_DIRECTORS = "/api/v1/directors"

let directorId

const director = {
    firstName: "Scott",
    lastName: "Waugh",
    nationality: "USA",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7APngDfMjtP5FfkF2RuKqpByto--Ka1Hr5P_WnRv7&s",
    birthday: "1970-08-22"
}

test("POST -> 'URL_DIRECTORS', should return status code 201 and res.body.firstName === director.firstName", async () => {
    const res = await request(app)
        .post(URL_DIRECTORS)
        .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET -> 'URL_DIRECTORS', should return status code 200 and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
        .get(URL_DIRECTORS)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> 'URL_DIRECTORS/:id', should return status code 200 and res.body.firstName === director.firstName", async () => {
    const res = await request(app)
        .get(`${URL_DIRECTORS}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("PUT -> 'URL_DIRECTORS/:id', should return status code 200 and res.body.firstName === directorUpdate.firstName", async () => {
    const directorUpdate = {
        firstName: "Akira"
    }

    const res = await request(app)
        .put(`${URL_DIRECTORS}/${directorId}`)
        .send(directorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
})

test("DELETE -> 'URL_DIRECTORS/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${URL_DIRECTORS}/${directorId}`)

    expect(res.status).toBe(204)
})