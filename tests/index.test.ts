import app from "../src/index";
import supertest from "supertest";

const api = supertest(app)


describe('POST /fruits', () => {

    it('Should respond with status 422 if no body', async () => {
        const result = await api.post('/fruits').send({})
        expect (result.status).toBe(422)
    })

    it('Should respond with status 422 if body invalid', async () => {
        
        const body = {
            name: "",
            price: "abc"
        }
        
        const result = await api.post('/fruits').send(body)
        expect (result.status).toBe(422)
    })

    it('Should respond with status 201 if fruit created', async () => {
        
        const body = {
            name: "Manga",
            price: 5.00
        }
        
        const result = await api.post('/fruits').send(body)
        expect (result.status).toBe(201)
    })

    it('Should respond with status 409 if fruit already exists', async () => {
        
        const body = {
            name: "Manga",
            price: 5.00
        }
        
        const result = await api.post('/fruits').send(body)
        expect (result.status).toBe(409)
    })
})

describe('GET /fruits', () => {

    it('Should respond with fruits array', async () => {
        const result = await api.get('/fruits')

        expect (result.body).toEqual(expect.arrayContaining([expect.objectContaining({
            id: 1,
            name: "Manga",
            price: 5.00
        })]))
    })
})

describe('GET:id /fruits', () => {


    it("returns 404 if fruit doesn't exist", async () => {
            
        const id = 2
  
        const result = await api.get(`/fruits/${id}`)
        expect(result.status).toEqual(404)
    });

    it('Should respond with status 422 if no params', async () => {
        const result = await api.post('/fruits/')
        expect (result.status).toBe(422)
    })

    it('Should respond with status 404 if params invalid', async () => {
        const result = await api.post('/fruits/abc')
        expect (result.status).toBe(404)
    })

    it('Should respond with specific fruit if it exists', async () => {
        const result = await api.get('/fruits/1')

        expect (result.body).toEqual(expect.objectContaining({
            id: 1,
            name: "Manga",
            price: 5.00
        }))
    })
})