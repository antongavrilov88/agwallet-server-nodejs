import Validator from 'validatorjs'
import {suid} from 'rand-token'
import {
    errors, createBadResponse, createSuccssResponse
} from '../helpers'
import {db} from '../../models/index'
import {userDataRules} from './requestDataRules'
import {LimitedAccessView} from '../LimitedAccessView'

const User = db.users
const Token = db.tokens
// const Token = db.tokens

export class UserAPI extends LimitedAccessView {
    create = async (req: any, res: any) => {
        try {
            const validation = new Validator(req, userDataRules)

            if (validation.fails()) {
                res.status(400).send(
                    createBadResponse(errors.WRONG_API)
                )
                return
            }

            const user = {
                email: req.body.email,
                password: req.body.password,
                admin: req.body.admin
            }
            const newUser = await User.create(user)

            if (!newUser) {
                res.status(500).send(
                    createBadResponse(errors.INTERNAL_ERROR)
                )
                return
            }

            // TODO add headers to jest tests
            const token = {
                userId: newUser.id,
                token: suid(16)
            }
            const newToken = await Token.create(token)

            if (!newToken) {
                res.status(500).send(
                    createBadResponse(errors.INTERNAL_ERROR)
                )
                return
            }

            const responseObject = {
                user: newUser,
                token: newToken.token
            }

            res.status(201).send(createSuccssResponse(responseObject))
        } catch (err) {
            console.log(err)
            res.status(500).send(
                createBadResponse(errors.INTERNAL_ERROR)
            )
        }
    }

    getAll = async (req: any, res: any) => {
        try {
            const status = await UserAPI.limitAccess(req)
            console.log(status)
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
