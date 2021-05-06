export const baseUrl = '/api/'

export enum UserRoutes {
    baseUserRoute = '/users',
    root = '/',
    userId = '/:id'
}

export enum AuthRoutes {
    baseAuthRoute = '/auth',
    signUp = '/signup',
    signIn = '/signin',
    signOut = '/signout'
}
