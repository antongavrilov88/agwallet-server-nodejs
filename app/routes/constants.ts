import {apiVersion} from '../controllers/config'

export type Nullable<T> = T | null | string

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

export const createURL = (api: string, entityId: Nullable<number> = '') => `${baseUrl + apiVersion + api + entityId}`
