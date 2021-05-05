import {AuthRoutes} from '../../routes/constants'
import {app} from '../../app'
import {db} from '../../models/index'
import {userRoutes} from '../../routes/user.routes'
import {authRoutes} from '../../routes/auth.routes'

const request = require('supertest')

userRoutes(app)
authRoutes(app)

const user = {
    email: 'Anton',
    password: '1234',
    admin: true
}

beforeEach(async (done) => {
    await db.sequelize.sync({force: true}).then(() => {
    })
    done()
})

describe('jdfbh', () => {
    it('should return Hello Test', async (done) => {
        await request(app)
            .post(AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(user)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(201)
            })
        done()
    })
})
