import {createURL, UserRoutes} from '../../routes/constants'
import {
    ErrorData,
    isErrorResponse,
    createErrorResponse,
    createSuccessResponse
} from '../responseHelpers'
import {LimitedAccessView} from '../LimitedAccessView'
import {User} from '../../models/User.model'

type Iterable<T> = T | T[]
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

    get = async (req: any, res: any) => {
        try {
            const authorizedUser: User | ErrorData = await LimitedAccessView.getAuthorizedUser(req)

            if (isErrorResponse(authorizedUser)) {
                throw new Error(JSON.stringify(authorizedUser))
            }

            const {id} = req.params
            const users: Iterable<User> | ErrorData = await User.get(id)

            if (isErrorResponse(users)) {
                throw new Error(JSON.stringify(users))
            }

            res.status(200).send(createSuccessResponse(
                Array.isArray(users)
                    ? users.map((user: User) => UserAPI.getData(user))
                    : UserAPI.getData(users)
            ))
        } catch (err) {
            const error = JSON.parse(err.message)
            res.status(error.status).send(
                createErrorResponse(error.message)
            )
        }
    }
}
