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
            const newUserResponse: User | Error = await User.add(req.body)

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
            console.log(err, 'TUUUUUUUUT')
            const errObject = JSON.parse(err.message)

            res.status(400).send(
                createErrorResponse(errObject.message)
            )
        }
    }

    // signIn = async (req: any, res: any) => {
    //     try {
    //         const isUser: any = await User.isUserExists(req.body.data.attributes.email)
    //         if ('code' in isUser) {
    //             throw new Error(JSON.stringify(isUser))
    //         }

    //         const newToken = await Token.add(isUser.id)
    //         if ('code' in newToken) {
    //             throw new Error(JSON.stringify(newToken))
    //         }

    //         const responseObject = {
    //             type: 'auth',
    //             attributes: {
    //                 token: newToken.token
    //             },
    //             links: {
    //                 self: createURL(AuthRoutes.signIn)
    //             }
    //         }

    //         res.status(201).send(createSuccessResponse(responseObject))
    //     } catch (err) {
    //         const errObject = JSON.parse(err.message)

    //         res.status(errObject.code).send(
    //             createErrorResponse(errObject.message)
    //         )
    //     }
    // }
}
