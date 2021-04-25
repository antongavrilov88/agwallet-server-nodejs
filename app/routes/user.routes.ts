import {create, getAll, getOne} from '../controllers/user/user.controller'
import {UserRoutes} from './constans'

export const userRoutes = (app: any) => {
    // eslint-disable-next-line global-require
    const router = require('express').Router()

    router.post(UserRoutes.root, create)

    router.get(UserRoutes.root, getAll)

    router.get(UserRoutes.userId, getOne)

    app.use(UserRoutes.baseUserRoute, router)
}
