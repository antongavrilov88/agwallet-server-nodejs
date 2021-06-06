import {AuthRoutes, createURL} from '../../routes/constants'
import {User} from '../../models/User.model'
import {LimitedAccessView} from '../LimitedAccessView'
import {createErrorResponse, createSuccessResponse} from '../responseHelpers'
import {Token} from '../../models/Token.model'

export class AuthAPI extends LimitedAccessView {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signUp = async (req: any, res: any) => {
        try {
            const newUserResponse = await User.add(req)

            if ('code' in newUserResponse) {
                throw new Error(JSON.stringify(newUserResponse))
            }

            const newTokenResponse = await Token.add(newUserResponse.id)

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
            const errObject = JSON.parse(err.message)

            res.status(errObject.code).send(
                createErrorResponse(errObject.message)
            )
        }
    }
}
