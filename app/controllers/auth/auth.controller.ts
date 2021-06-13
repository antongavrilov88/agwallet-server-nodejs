import {AuthRoutes, createURL} from '../../routes/constants'
import {User} from '../../models/User.model'
import {LimitedAccessView} from '../LimitedAccessView'
import {
    createErrorResponse,
    createSuccessResponse,
    Error,
    isErrorResponse
} from '../responseHelpers'
import {Token} from '../../models/Token.model'

export class AuthAPI extends LimitedAccessView {
    signUp = async (req: any, res: any) => {
        try {
            const newUserResponse: User | Error = await User.add(req)

            if (isErrorResponse(newUserResponse)) {
                throw new Error(JSON.stringify(newUserResponse))
            }

            const newTokenResponse: Token | Error = await Token.add(newUserResponse.id)

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
            res.status(400).send(
                createErrorResponse(JSON.parse(err.message))
            )
        }
    }
}
