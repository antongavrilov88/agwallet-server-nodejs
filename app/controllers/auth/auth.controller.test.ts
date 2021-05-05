import {db} from '../../models/index'
import {app} from '../../app'
import {AuthRoutes} from '../../routes/constans'

const request = require('supertest')

const user = {
    email: 'Anton',
    password: 'qwerty1234',
    admin: true
}

beforeEach(async () => {
    await db.sequelize.drop()
    await db.sequelize.sync({force: true})
})

describe('my api test', () => {
    it('Create user', async (done) => {
        await request(app)
            .post(AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(user)
            .then((data: any) => {
                expect(data.status).toEqual(201)
                expect(data).toBeDefined()
                expect(JSON.parse(data.text).data.user.email).toEqual('Anton')
            })
        done()
    })
})
