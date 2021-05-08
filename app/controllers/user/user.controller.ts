import {baseUrl, UserRoutes} from '../../routes/constants'
import {
    errors, createBadResponse
} from '../helpers'
import {db} from '../../models/index'
import {LimitedAccessView} from '../LimitedAccessView'
import {apiVersion} from '../config'

const User = db.users

export class UserAPI extends LimitedAccessView {
    static getData = (user:any, minimal = null) => {
        const responseObject: any = {}
        responseObject.type = 'users'
        responseObject.id = user.id
        responseObject.links = {
            self: `${baseUrl + apiVersion + UserRoutes.baseUserRoute}/${user.id}`
        }
        if (!minimal) {
            responseObject.attributes = {
                email: user.email,
                admin: user.admin
            }
        }
        return responseObject
    }

    getAll = async (req: any, res: any) => {
        try {
            const status = await UserAPI.limitAccess(req)
            if (!status) {
                res.status(401).send(
                    createBadResponse(errors.TOKEN_NOT_PROVIDED)
                )
                return
            }

            const users = await User.findAll()

            res.status(200).send(users.map((user: any) => UserAPI.getData(user)))
        } catch (err) {
            res.status(500).send(
                createBadResponse(errors.INTERNAL_ERROR)
            )
        }
    }

    getOne = async (req: any, res: any) => {
        try {
            const status = await UserAPI.limitAccess(req)
            if (!status) {
                res.status(401).send(
                    createBadResponse(errors.TOKEN_NOT_PROVIDED)
                )
            }

            const {id} = req.params

            const user = await User.findOne({where: {id}})
            if (user === null) {
                res.status(404).send(
                    createBadResponse(errors.USER_NOT_FOUND)
                )
                return
            }
            res.status(200).send(UserAPI.getData(user))
        } catch (err) {
            res.status(500).send(
                createBadResponse(errors.INTERNAL_ERROR)
            )
        }
    }
}
