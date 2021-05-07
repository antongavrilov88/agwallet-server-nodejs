import {app} from '../app'
import {baseUrl, AuthRoutes} from '../routes/constants'
import {apiVersion} from './config'

// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest')

export const createUser = async (user: any) => {
    const newUser = await request(app)
        .post(baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
        .send(user)
        .set('Accept', 'application/json')
        .then((data: any) => data)
    return newUser
}

export const signUpUser = {
    data: {
        type: 'auth',
        attributes: {
            email: 'Anton',
            password: '1234'
        }
    }
}

export const signInUser = {
    data: {
        type: 'auth',
        attributes: {
            email: 'Anton',
            password: '1234'
        }
    }
}

export const signInUserWrongPassword = {
    data: {
        type: 'auth',
        attributes: {
            email: 'Anton',
            password: '12shdg'
        }
    }
}
