import {authRoutes} from './auth.routes'
import {userRoutes} from './user.routes'

const routes = [
    authRoutes,
    userRoutes
]

export const router = (app: any) => {
    routes.map(route => route(app))
}
