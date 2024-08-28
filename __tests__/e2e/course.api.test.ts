import request from "supertest"
import agent from "supertest"
import {app} from '../../src'

const req = agent(app)

describe('/course', () => {
    it('basic', async () => {
        expect(1).toBe(1)
    })

    it('log', async () => {
        
        var res: any

        res = await req
            .post('/hometask_01/api/videos')
            .send({
                title: "Tit",
                author: "Aut",
                availableResolutions: ["P480"]
            })
        console.log(res.status)
        console.log(res.body)

        res = await req
            .post('/hometask_01/api/videos')
            .send({
                title: "Tit",
                author: "Aut",
                availableResolutions: ["P380"]
            })
        console.log(res.status)
        console.log(res.body)

        res = await req
            .post('/hometask_01/api/videos')
            .send({
                title: "Tit",
                author: "Aut0123456789012345678901234567890123456789",
                availableResolutions: ["P480"]
            })
        console.log(res.status)
        console.log(res.body)
        
        res = await req
            .get('/hometask_01/api/videos')
        console.log(res.status)
        console.log(res.body)

        res = await req
            .get('/hometask_01/api/videos/1')
        console.log(res.status)
        console.log(res.body)

        res = await req
            .get('/hometask_01/api/videos/2')
        console.log(res.status)
        console.log(res.body)

        expect(1).toBe(1)
    })
})