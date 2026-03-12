const request = require('supertest')
const app = require('../server')

describe("Authentification", () => {

    test("register un utilisateur", async () => {

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                email:"test@test.com",
                password:"123456",
                name:"Test User"
            })

        expect(res.statusCode).toBe(201)
        expect(res.body.token).toBeDefined()

    })

    test("login utilisateur", async () => {

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email:"admin@test.com",
                password:"password"
            })

        expect(res.statusCode).toBe(200)
        expect(res.body.token).toBeDefined()

    })

})