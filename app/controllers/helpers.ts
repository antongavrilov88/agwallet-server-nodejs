/* eslint-disable @typescript-eslint/no-unused-vars */
import Validator from 'validatorjs'
import {User} from '../models/User.model'
import {Token} from '../models/Token.model'
import {createBadRequestResponse, createNotFoundResponse, ErrorData} from './responseHelpers'
import {signInDataRules} from './auth/requestDataRules'
import {SignInData} from './auth/types'

type Nullable<T> = T | null

export const checkUserStatus = async (token: string): Promise<Nullable<Token>> => {
    const status: Nullable<Token> = await Token.findOne({where: {token}})
        .then((data: any) => (data !== null ? data.id : false))
        .catch((_err: {message: any}) => {
        })
    return status
}

export class Auth {
    static async status(header: string): Promise<boolean> {
        let token: Nullable<string> = ''
        if (!header) {
            return false
        }
        const authorization = header.split(' ')
        if (authorization.length !== 2) {
            return false
        }
        [,token] = authorization
        const isTokenPresent = await Token.count({where: {token}})
            .then((response: number) => response > 0)

        return isTokenPresent
    }

    static async getSigningInUserData(req: unknown): Promise<User | ErrorData> {
        const isSignInData = (obj: unknown): obj is SignInData => {
            const validation = new Validator(obj, signInDataRules)
            return !validation.fails()
        }

        if (!isSignInData(req)) {
            return createBadRequestResponse()
        }

        const user: Nullable<User> = await User.findOne({
            where: {email: req.body.data.attributes.email}
        })

        if (user === null) {
            return createNotFoundResponse()
        }

        return user
    }
}

export const checkEmail = async (email: string): Promise<Boolean> => {
    const count: Nullable<User> = await User.findOne({where: {email}})
    return count !== null
}
