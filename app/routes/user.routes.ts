import {create, getAll, getOne} from '../controllers/user/user.controller'

export const userRoutes = (app: any) => {
    // eslint-disable-next-line global-require
    const router = require('express').Router()

    router.post('/', create)

    router.get('/', getAll)

    router.get('/:id', getOne)

    app.use('/api/users', router)
}
