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
}
