import {app} from '../app'
import {baseUrl, AuthRoutes} from '../routes/constants'
import {apiVersion} from './config'

// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest')

export class TestAPIHelper {
    static request = {
        post: async (data: any, url: any, token: any = null) => {
            let res
            if (token) {
                res = await request(app)
                    .post(url)
                    .send(data)
                    .set('Authorization', `Bearer ${token}`)
                    .set('Accept', 'application/json')
                    .then((response: any) => response)
            } else {
                res = await request(app)
                    .post(url)
                    .send(data)
                    .set('Accept', 'application/json')
                    .then((response: any) => response)
            }
            return res
        }
    }

    static createUser = async (signUpData: any) => {
        const newUser = TestAPIHelper.request.post(
            signUpData,
            baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signUp
        )
        return newUser
    }

    static signInUser = async (signInData: any) => {
        const newAuth = TestAPIHelper.request.post(
            signInData,
            baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signIn
        )
        return newAuth
    }

    static signOut = async (token: any) => {
        const signOutResponse = TestAPIHelper.request.post(
            {},
            baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signOut,
            token
        )
        return signOutResponse
    }
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
