import {app} from '../../app'
import {AuthRoutes} from '../../routes/constans'

const request = require('supertest')

const user = {
    email: 'Anton',
    password: 'qwerty1234',
    admin: true
}

describe('my api test', () => {
    it('Create user', async (done) => {
        await request(app)
            .post(AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(user)
            .then(async (data: any) => {
                // expect(data.status).toEqual(201)
                // expect(data).toBeDefined()
                expect(data).toEqual('Anton')
            })
        done()
    })
})
