import Validator from 'validatorjs'
import {suid} from 'rand-token'
import {
    errors, createBadResponse, createSuccessResponse, checkEmail
} from '../helpers'
import {db} from '../../models/index'
import {signInDataRules, signUpDataRules} from './requestDataRules'
import {LimitedAccessView} from '../LimitedAccessView'

const bcrypt = require('bcrypt')

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

            if (await checkEmail(req.body.data.attributes.email)) {
                res.status(409).send(
                    createBadResponse(errors.USER_CONFLICT)
                )
                return
            }

            const hashPassword = bcrypt.hashSync(req.body.data.attributes.password, 10)

            const user = {
                email: req.body.data.attributes.email,
                password: hashPassword,
                admin: false
            }

            const newUser = await User.create(user)

            if (!newUser) {
                res.status(500).send(
                    createBadResponse(errors.INTERNAL_ERROR)
                )
                return
            }

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
                type: 'auth',
                attributes: {
                    token: newToken.token
                },
                links: {
                    self: ''
                }
            }

            res.status(201).send(createSuccessResponse(responseObject))
        } catch (err) {
            res.status(500).send(
                createBadResponse(errors.INTERNAL_ERROR)
            )
        }
    }
    signIn = async (req: any, res: any) => {
        try {
            const validation = new Validator(req, signInDataRules)

            if (validation.fails()) {
                res.status(400).send(
                    createBadResponse(errors.WRONG_API)
                )
                return
            }

            const user = await User.findOne({where: {email: req.body.data.attributes.email}})
            if (!user) {
                res.status(404).send(
                    createBadResponse(errors.USER_NOT_FOUND)
                )
                return
            }

            const status = await Token.findOne({where: {userId: user.id}})
            if (status) {
                res.status(409).send(
                    createBadResponse(errors.AUTH_CONFLICT)
                )
                return
            }

            const userPassword = user.password

            const passwordVerifyStatus = bcrypt.compareSync(
                req.body.data.attributes.password,
                userPassword
            )

            if (!passwordVerifyStatus) {
                res.status(401).send(
                    createBadResponse(errors.WRONG_PASSWORD)
                )
                return
            }

            const token = {
                userId: user.id,
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
                token: newToken.token
            }

            res.status(201).send(
                createSuccessResponse(responseObject)
            )
        } catch {
            res.status(500).send(
                createBadResponse(errors.INTERNAL_ERROR)
            )
        }
    }
    signOut = async (req: any, res: any) => {
        try {
            const status = await AuthAPI.limitAccess(req)
            if (!status) {
                res.status(401).send(
                    createBadResponse(errors.TOKEN_NOT_PROVIDED)
                )
                return
            }

            const token = req.headers.authorization.split(' ')

            const logout = await Token.destroy(
                {where: {token: token[1]}}
            )
            if (!logout) {
                res.status(500).send(
                    createBadResponse(errors.INTERNAL_ERROR)
                )
            }

            res.status(200).send(
                createSuccessResponse('User logout')
            )
        } catch (error) {
            res.status(500).send(
                createBadResponse(errors.INTERNAL_ERROR)
            )
        }
    }
}
