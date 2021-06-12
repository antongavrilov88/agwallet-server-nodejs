/* eslint-disable @typescript-eslint/no-unused-vars */
import {User} from '../models/User.model'
import {Token} from '../models/Token.model'

type Nullable<T> = T | null

export const checkUserStatus = async (token: string): Promise<Nullable<Token>> => {
    const status: Nullable<Token> = await Token.findOne({where: {token}})
        .then((data: any) => (data !== null ? data.id : false))
        .catch((_err: {message: any}) => {
        })
    return status
}

export class Auth {
    static async status(header: string) {
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
}

export const checkEmail = async (email: string): Promise<Boolean> => {
    const count: Nullable<User> = await User.findOne({where: {email}})
    return count !== null
}
