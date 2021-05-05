import {AuthRoutes} from '../../routes/constants'
import {app} from '../../app'
import {db} from '../../models/index'
import {userRoutes} from '../../routes/user.routes'
import {authRoutes} from '../../routes/auth.routes'

const request = require('supertest')

userRoutes(app)
authRoutes(app)

const signUpUser = {
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
            .send(signUpUser)
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
            .send(signUpUser)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(409)
            })
        done()
    })
    it('Should return 409 response status to signin request with user already in system', async (done) => {
        await request(app)
            .post(AuthRoutes.baseAuthRoute + AuthRoutes.signIn)
            .send(signInUser)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(409)
            })
        done()
    })
    it('Should return 200 response status to signout request with user already in system', async (done) => {
        await db.sequelize.sync({force: true}).then(() => {
        })
        const token = await request(app)
            .post(AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(signUpUser)
            .set('Accept', 'application/json')
            .then((data: any) => JSON.parse(data.text).data.token)
        await request(app)
            .post(AuthRoutes.baseAuthRoute + AuthRoutes.signOut)
            .send()
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(200)
            })
        done()
    })
})
