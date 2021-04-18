import {create, getAll, getOne} from '../controllers/user.controller'

const router = require('express')

export const userRoutes = (app: any) => {
    router.Router()

    router.post('/', create);

    router.get('/', getAll)

    router.get('/:id', getOne)

    app.use('/api/users', router)
}
