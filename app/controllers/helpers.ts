/* eslint-disable @typescript-eslint/no-unused-vars */
import Validator from 'validatorjs'
import {User} from '../models/User.model'
import {Token} from '../models/Token.model'
import {
    createBadRequestResponse,
    createTokenNotProvidedResponse,
    createUnauthorizedResponse,
    createUserNotFoundResponse,
    ErrorData
} from './responseHelpers'
import {signInDataRules} from './auth/requestDataRules'
import {SignInData} from './auth/types'

type Nullable<T> = T | null

type RequestObjectWithHeader = {
    headers: {
        authorization: string
    }
}

export const checkUserStatus = async (token: string): Promise<Nullable<Token>> => {
    const status: Nullable<Token> = await Token.findOne({where: {token}})
        .then((data: any) => (data !== null ? data.id : false))
        .catch((_err: {message: any}) => {
        })
    return status
}

export class Auth {
    static async getStatus(obj: unknown): Promise<User | ErrorData> {
        const isHeaderProvided = (value: unknown): value is RequestObjectWithHeader => (
            // TODO complete typeGuard
            typeof value === 'object'
                && value !== null
                && 'headers' in value
        )

        if (!isHeaderProvided(obj)) {
            return createTokenNotProvidedResponse()
        }
        const header = obj.headers.authorization
        if (!header) {
            return createBadRequestResponse()
        }
        const authorization = header.split(' ')
        if (authorization.length !== 2) {
            return createBadRequestResponse()
        }
        const [,token] = authorization
        const currentToken: Nullable<Token> = await Token.findOne({where: {token}})

        if (currentToken === null) {
            return createUnauthorizedResponse()
        }

        const user: Nullable<User> = await User.findOne({where: {id: currentToken.userId}})

        if (user === null) {
            return createUserNotFoundResponse()
        }

        return user
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
            return createUserNotFoundResponse()
        }

        return user
    }
}

export const checkEmail = async (email: string): Promise<Boolean> => {
    const count: Nullable<User> = await User.findOne({where: {email}})
    return count !== null
}
