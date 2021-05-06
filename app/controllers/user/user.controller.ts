import {
    errors, createBadResponse
} from '../helpers'
import {db} from '../../models/index'
import {LimitedAccessView} from '../LimitedAccessView'

const User = db.users

export class UserAPI extends LimitedAccessView {
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

            if (!users) {
                res.status(500).send(
                    createBadResponse(errors.INTERNAL_ERROR)
                )
                return
            }

            res.status(200).send(users)
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
            res.status(200).send(user)
        } catch (err) {
            res.status(500).send(
                createBadResponse(errors.INTERNAL_ERROR)
            )
        }
    }
}
