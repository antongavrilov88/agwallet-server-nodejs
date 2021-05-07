import {AuthRoutes, baseUrl} from '../../routes/constants'
import {app} from '../../app'
import {db} from '../../models/index'
import {userRoutes} from '../../routes/user.routes'
import {authRoutes} from '../../routes/auth.routes'
import {apiVersion} from '../config'

const request = require('supertest')

userRoutes(app)
authRoutes(app)

const signUpUser = {
    data: {
        type: 'auth',
        attributes: {
            email: 'Anton',
            password: '1234'
        }
    }
}

const signInUser = {
    data: {
        type: 'auth',
        attributes: {
            email: 'Anton',
            password: '1234'
        }
    }
}

const signInUserWrongPassword = {
    data: {
        type: 'auth',
        attributes: {
            email: 'Anton',
            password: '12shdg'
        }
    }
}

beforeEach(async (done) => {
    await db.sequelize.sync({force: true}).then(() => {
    })
    done()
})

describe('Auth API tests', () => {
    it('Should return 201 response status and token to signup request with valid data', async (done) => {
        await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(signUpUser)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(201)
                expect(JSON.parse(data.text).data.type).toEqual('auth')
                expect(JSON.parse(data.text).data.attributes.token).toBeDefined()
            })
        done()
    })
    it('Should return 409 response status to signup request with existing email', async (done) => {
        await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(signUpUser)
            .set('Accept', 'application/json')
            .then(() => {})
        await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(signUpUser)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(409)
            })
        done()
    })
    it('Should return 409 response status to signin request with user already in system', async (done) => {
        await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(signUpUser)
            .set('Accept', 'application/json')
            .then(() => {})
        await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signIn)
            .send(signInUser)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(409)
            })
        done()
    })
    it('Should return 200 response status to signout request with user valid data', async (done) => {
        const token = await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(signUpUser)
            .set('Accept', 'application/json')
            .then((data: any) => JSON.parse(data.text).data.attributes.token)
        await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signOut)
            .send()
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(200)
            })
        done()
    })
    it('Should return 201 response status to signin request with valid data', async (done) => {
        const token = await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(signUpUser)
            .set('Accept', 'application/json')
            .then((data: any) => JSON.parse(data.text).data.attributes.token)
        await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signOut)
            .send()
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .then(() => {})
        await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signIn)
            .send(signInUser)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(201)
            })
        done()
    })
    it('Should return 401 response status to signin request with wrong password', async (done) => {
        const token = await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(signUpUser)
            .set('Accept', 'application/json')
            .then((data: any) => JSON.parse(data.text).data.attributes.token)
        await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signOut)
            .send()
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .then(() => {})
        await request(app)
            .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signIn)
            .send(signInUserWrongPassword)
            .set('Accept', 'application/json')
            .then((data: any) => {
                expect(data.status).toEqual(401)
            })
        done()
    })
})
