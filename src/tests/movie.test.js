const request = require("supertest")
const app = require("../app")
const Genre = require("../models/Genre")
const Actor = require("../models/Actor")
const Director = require("../models/Director")
require("../models")
const URL_MOVIES = '/api/v1/movies'

let movieId

const movie = {
    name: "Proyecto Extracción",
    image: "https://quevedoinformativo.com/wp-content/uploads/2023/05/hidden-strike-poster.jpg",
    synopsis: "Dos antiguos soldados de élite deben escoltar a un grupo de civiles a través de la carretera más peligrosa del mundo, bajo una tormenta de disparos y explosiones",
    releaseYear: 2023
}

test("POST -> 'URL_MOVIES', should return status code 201 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .post(URL_MOVIES)
        .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("GET -> 'URL_MOVIES', should return status code 200 and res.body.toHaveLength === 1", async () => {
    const res = await request(app)
        .get(URL_MOVIES)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE -> 'URL_MOVIES/:id', should return status code 200 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .get(`${URL_MOVIES}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("PUT -> 'URL_MOVIES/:id', should return status code 200 and res.body.name === movieUpdate.name", async () => {
    const movieUpdate = {
        name: "Spiderman"
    }

    const res = await request(app)
        .put(`${URL_MOVIES}/${movieId}`)
        .send(movieUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
})

test("POST -> 'URL_MOVIES/:id/actors', should return status code 200 and res.body.toHaveLength === 1", async () => {
    const actor = {
        firstName: "Jhon",
        lastName: "Cena",
        nationality: "USA",
        image: "https://es.web.img3.acsta.net/pictures/17/06/14/13/48/489688.jpg",
        birthday: "1977-04-23"
    }

    const createActor = await Actor.create(actor)

    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/actors`)
        .send([createActor.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createActor.id)

    await createActor.destroy()
})

test("POSt -> 'URL_MOVIES/:id/directors', should return status code 200 and res.body.toHaveLength === 1", async () => {
    const director = {
        firstName: "Akira",
        lastName: "Kurosawa",
        nationality: "Japan",
        image: "https://m.media-amazon.com/images/M/MV5BMjE3ODQwNTY2Nl5BMl5BanBnXkFtZTcwMTI5ODM1Mw@@._V1_.jpg",
        birthday: "1910-03-23"
    }

    const createDirector = await Director.create(director)
    
    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/directors`)
        .send([createDirector.id])
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createDirector.id)

    await createDirector.destroy()
})

test("POSt -> 'URL_MOVIES/:id/genres', should return status code 200 and res.body.toHaveLength === 1", async () => {
    const genre = {
        name: "militar"
    }

    const createGenre = await Genre.create(genre)

    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/genres`)
        .send([createGenre.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createGenre.id)
      
    await createGenre.destroy()
})

test("DELETE -> 'URL_MOVIES/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${URL_MOVIES}/${movieId}`)

    expect(res.status).toBe(204)
})