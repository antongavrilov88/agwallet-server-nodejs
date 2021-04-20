import Validator from 'validatorjs'
import {checkUserStatus, errors, createBadResponse} from '../helpers'
import {db} from '../../models/index'
import {userDataRules} from './requestDataRules'

const User = db.users
const Token = db.tokens

export const create = async (req: any, res: any) => {
    try {
        // const status = await checkUserStatus(req.headers.authorization)

        const status = false
        if (status) {
            res.status(409).send(
                createBadResponse(errors.AUTH_CONFLICT)
            )
            return
        }
        const validation = new Validator(req, userDataRules)

        if (validation.fails()) {
            res.status(400).send(
                createBadResponse(errors.WRONG_API)
            )
            return
        }

        const user = {
            displayName: req.body.displayName,
            avatar: req.body.avatar
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
            token: req.headers.authorization
        }

        const newToken = await Token.create(token)

        if (!newToken) {
            res.status(500).send(
                createBadResponse(errors.INTERNAL_ERROR)
            )
            return
        }

        res.status(201).send(newUser)
    } catch (err) {
        res.status(500).send(
            createBadResponse(errors.INTERNAL_ERROR)
        )
    }
}

export const getAll = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(errors.UNAUTHORIZED)
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

export const getOne = async (req: any, res: any) => {
    try {
        const status = await checkUserStatus(req.headers.authorization)

        if (!status) {
            res.status(401).send(
                createBadResponse(errors.UNAUTHORIZED)
            )
            return
        }

        const {id} = req.params

        const user = await User.findOne({where: {id}})

        if (!user) {
            res.status(500).send(
                createBadResponse(errors.INTERNAL_ERROR)
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
