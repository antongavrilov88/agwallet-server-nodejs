import {AuthRoutes, createURL} from '../../routes/constants'
import {User} from '../../models/User.model'
import {LimitedAccessView} from '../LimitedAccessView'
import {
    createErrorResponse,
    createSuccessResponse,
    ErrorData,
    isErrorResponse
} from '../responseHelpers'
import {Token} from '../../models/Token.model'
import {Auth} from '../helpers'

export class AuthAPI extends LimitedAccessView {
    signUp = async (req: unknown, res: any) => {
        try {
            const newUser: User | ErrorData = await User.add(req)

            if (isErrorResponse(newUser)) {
                throw new Error(JSON.stringify(newUser))
            }

            const newToken: Token | ErrorData = await Token.add(newUser.id)

            if (isErrorResponse(newToken)) {
                throw new Error(JSON.stringify(newToken))
            }

            const responseObject = {
                type: 'auth',
                id: newUser.id,
                attributes: {
                    token: newToken.token
                },
                links: {
                    self: createURL(AuthRoutes.signUp)
                }
            }

            res.status(201).send(createSuccessResponse(responseObject))
        } catch (err) {
            const error = JSON.parse(err.message)
            res.status(error.status).send(
                createErrorResponse(error.message)
            )
        }
    }
    signIn = async (req: unknown, res: any) => {
        try {
            const newUser: User | ErrorData = await Auth.getSigningInUserData(req)

            if (isErrorResponse(newUser)) {
                throw new Error(JSON.stringify(newUser))
            }

            const newToken: Token | ErrorData = await Token.add(newUser.id)

            if (isErrorResponse(newToken)) {
                throw new Error(JSON.stringify(newToken))
            }

            const responseObject = {
                type: 'auth',
                attributes: {
                    token: newToken.token
                },
                links: {
                    self: createURL(AuthRoutes.signIn)
                }
            }
            res.status(200).send(createSuccessResponse(responseObject))
        } catch (err) {
            const error = JSON.parse(err.message)
            res.status(error.status).send(
                createErrorResponse(error.message)
            )
        }
    }
    signOut = async (req: unknown, res: any) => {
        try {
            // eslint-disable-next-line max-len
            const authorizedUser: User | ErrorData = await LimitedAccessView.getAuthorizedUser(req)

            if (isErrorResponse(authorizedUser)) {
                throw new Error(JSON.stringify(authorizedUser))
            }

            const userSignedOut: number | ErrorData = await Token.remove(authorizedUser.id)

            if (isErrorResponse(userSignedOut)) {
                throw new Error(JSON.stringify(userSignedOut))
            }
            res.status(200).send(createSuccessResponse(null))
        } catch (err) {
            const error = JSON.parse(err.message)
            res.status(error.status).send(
                createErrorResponse(error.message)
            )
        }
    }
}
