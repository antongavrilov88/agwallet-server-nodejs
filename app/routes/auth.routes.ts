import {AuthAPI} from '../controllers/auth/auth.controller'
import {AuthRoutes} from './constans'

export const authRoutes = (app: any) => {
    // eslint-disable-next-line global-require
    const router = require('express').Router()

    const authAPI = new AuthAPI()

    router.post(AuthRoutes.signUp, authAPI.signUp)

    router.post(AuthRoutes.signIn, authAPI.signIn)

    router.post(AuthRoutes.signOut, authAPI.signOut)

    app.use(AuthRoutes.baseAuthRoute, router)
}
