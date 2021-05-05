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

const signInUser = {
    email: 'Anton',
    password: '1234'
}

beforeAll(async (done) => {
    await db.sequelize.sync({force: true}).then(() => {
    })
    done()
})

describe('Auth API tests', () => {
    it('Should return 201 response status and Anton as email to signup request with valid data', async (done) => {
        await request(app)
            .post(AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(user)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(201)
                expect(JSON.parse(data.text).data.user.email).toEqual('Anton')
            })
        done()
    })
    it('Should return 409 response status to signup request with existing email', async (done) => {
        await request(app)
            .post(AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(user)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(409)
            })
        done()
    })
    it('Should return 409 response status to signin request with user alredy in system', async (done) => {
        await request(app)
            .post(AuthRoutes.baseAuthRoute + AuthRoutes.signIn)
            .send(signInUser)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(409)
            })
        done()
    })
})
