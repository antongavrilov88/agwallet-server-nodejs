import {authRoutes} from './auth.routes'
// import {userRoutes} from './user.routes'

export const router = (app: any) => {
    const routes = [
        authRoutes
        // userRoutes
    ]
    routes.map(route => route(app))
}
