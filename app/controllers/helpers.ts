import {User} from '../models/User.model'
import {Token} from '../models/Token.model'
import {errors} from './responseHelpers'

export const checkUserStatus = async (token: any) => {
    const status = Token.findOne({where: {token}})
        .then((data: any) => (data !== null ? data.id : false))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((_err: {message: any}) => {
        })
    return await status
}

export class Auth {
    static async status(header: string) {
        let token: string | null = null
        if (header) {
            const authorization = header.split(' ')
            if (authorization.length !== 2) {
                return errors.TOKEN_NOT_PROVIDED
            }
            // eslint-disable-next-line prefer-destructuring
            token = authorization[1]
            const id = async () => {
                const status = Token.findOne({where: {token}})
                    .then((data: any) => (data !== null ? data.id : false))
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .catch((_err: {message: any}) => {
                    })
                return await status
            }
            return await id()
        }
        return false
    }
}

export const checkEmail = async (email: any) => {
    const count = await User.findOne({where: {email}})
    return count !== null
}
