import Validator from 'validatorjs'
import {suid} from 'rand-token'
import {
    errors, createBadResponse, createSuccssResponse, checkEmail
} from '../helpers'
import {db} from '../../models/index'
import {signUpDataRules} from './requestDataRules'
import {LimitedAccessView} from '../LimitedAccessView'

const User = db.users
const Token = db.tokens

export class AuthAPI extends LimitedAccessView {
    signUp = async (req: any, res: any) => {
        try {
            const validation = new Validator(req, signUpDataRules)

            if (validation.fails()) {
                res.status(400).send(
                    createBadResponse(errors.WRONG_API)
                )
                return
            }

            if (await checkEmail(req.body.email)) {
                res.status(409).send(
                    createBadResponse(errors.USER_CONFLICT)
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
}
