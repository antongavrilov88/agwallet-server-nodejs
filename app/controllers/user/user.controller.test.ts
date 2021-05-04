import {db} from '../../models/indexTest'
import {app} from '../../appTest'
import {UserRoutes} from '../../routes/constans'

const request = require('supertest')

beforeEach(async (done) => {
    await db.sequelize.sync({force: true})
    done()
})

afterEach(async (done) => {
    db.sequelize.drop()
    done()
})

const user = {
    email: 'Anton',
    password: 'qwerty1234',
    admin: true
}

describe('my api test', () => {
    it('Create user', async (done) => {
        await request(app)
            .post(UserRoutes.baseUserRoute + UserRoutes.root)
            .send(user)
            .then(async (data: any) => {
                expect(202)
                expect(data).toBeDefined()
                expect(data.body.email).toEqual('Anton')
            })
        done()
    })
})
