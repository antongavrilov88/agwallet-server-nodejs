import {apiVersion} from '../controllers/config'

export const baseUrl = '/api/'

export enum UserRoutes {
    root = '/users/',
    userId = '/users/:id'
}

export enum AuthRoutes {
    root = '/auth/',
    signUp = '/auth/signup',
    signIn = '/auth/signin',
    signOut = '/auth/signout'
}

export const createURL = (api: string, entityId = '') => `${baseUrl + apiVersion + api + entityId}`
