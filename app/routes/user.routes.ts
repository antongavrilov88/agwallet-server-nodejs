import {apiVersion} from '../controllers/config'
import {UserAPI} from '../controllers/user/user.controller'
import {baseUrl, UserRoutes} from './constants'

export const userRoutes = (app: any) => {
    // eslint-disable-next-line global-require
    const router = require('express').Router()

    const userAPI = new UserAPI()

    router.get(UserRoutes.root, userAPI.get)

    router.get(UserRoutes.userId, userAPI.get)

    app.use(baseUrl + apiVersion + UserRoutes.baseUserRoute, router)
}
