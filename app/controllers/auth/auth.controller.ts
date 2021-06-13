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
            const newUserResponse: User | ErrorData = await User.add(req)

            if (isErrorResponse(newUserResponse)) {
                throw new Error(JSON.stringify(newUserResponse))
            }

            const newTokenResponse: Token | ErrorData = await Token.add(newUserResponse.id)

            if (isErrorResponse(newTokenResponse)) {
                throw new Error(JSON.stringify(newTokenResponse))
            }

            const responseObject = {
                type: 'auth',
                id: newUserResponse.id,
                attributes: {
                    token: newTokenResponse.token
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
            const userResponse: User | ErrorData = await Auth.getSigningInUserData(req)

            if (isErrorResponse(userResponse)) {
                throw new Error(JSON.stringify(userResponse))
            }

            const userId = userResponse.id

            const newTokenResponse: Token | ErrorData = await Token.add(userId)

            if (isErrorResponse(newTokenResponse)) {
                throw new Error(JSON.stringify(newTokenResponse))
            }

            const responseObject = {
                type: 'auth',
                attributes: {
                    token: newTokenResponse.token
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
}
