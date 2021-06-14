import {apiVersion} from '../controllers/config'

export type Nullable<T> = T | null

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

export const createURL = (api: string, entityId: Nullable<number> = null) => `${baseUrl + apiVersion + api + entityId}`
