const request = require('supertest')
const app = require('../server')

let token = ""

beforeAll(async () => {

    const res = await request(app)
        .post("/api/auth/login")
        .send({
            email:"admin@test.com",
            password:"password"
        })

    token = res.body.token

})

describe("API Tasks", () => {

    test("GET tasks", async () => {

        const res = await request(app)
            .get("/api/tasks")
            .set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)

    })

    test("CREATE task", async () => {

        const res = await request(app)
            .post("/api/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title:"Nouvelle tâche test"
            })

        expect(res.statusCode).toBe(201)
        expect(res.body.title).toBe("Nouvelle tâche test")

    })

})