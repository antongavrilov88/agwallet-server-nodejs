import {UserAPI} from '../controllers/user/user.controller'
import {UserRoutes} from './constans'

export const userRoutes = (app: any) => {
    // eslint-disable-next-line global-require
    const router = require('express').Router()

    const userAPI = new UserAPI()

    router.post(UserRoutes.root, userAPI.create)

    router.get(UserRoutes.root, userAPI.getAll)

    router.get(UserRoutes.userId, userAPI.getOne)

    app.use(UserRoutes.baseUserRoute, router)
}
