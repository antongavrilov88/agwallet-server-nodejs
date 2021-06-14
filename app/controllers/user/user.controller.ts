import {createURL, UserRoutes} from '../../routes/constants'
import {
    ErrorData,
    isErrorResponse,
    createErrorResponse
} from '../responseHelpers'
import {LimitedAccessView} from '../LimitedAccessView'
import {User} from '../../models/User.model'

export class UserAPI extends LimitedAccessView {
    static getData = (user: User, minimal = null) => {
        const responseObject: any = {}
        responseObject.type = 'users'
        responseObject.id = user.id
        responseObject.links = {
            self: createURL(UserRoutes.root, user.id)
        }
        if (!minimal) {
            responseObject.attributes = {
                email: user.email,
                admin: user.admin
            }
        }
        return responseObject
    }

    get = async (req: unknown, res: any) => {
        try {
            const authorizedUser: User | ErrorData = await LimitedAccessView.getAuthorizedUser(req)

            if (isErrorResponse(authorizedUser)) {
                throw new Error(JSON.stringify(authorizedUser))
            }

            // const users: User | User[] | ErrorData = await User.get(req)
            // const {id} = req.params

            // if (!id) {
            //     const users = await User.findAll()

            //     res.status(200).send(createSuccessResponse(
            //         users.map((user: any) => UserAPI.getData(user))
            //     ))
            // } else {
            //     const user = await User.findOne({where: {id}})
            //     if (user === null) {
            //         res.status(404).send(
            //             createBadResponse(errors.USER_NOT_FOUND)
            //         )
            //         return
            //     }
            //     res.status(200).send(
            //         createSuccessResponse(UserAPI.getData(user))
            //     )
            // }
        } catch (err) {
            const error = JSON.parse(err.message)
            res.status(error.status).send(
                createErrorResponse(error.message)
            )
        }
    }
}
