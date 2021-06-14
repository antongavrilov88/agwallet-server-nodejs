import {Token} from '../models/Token.model'
import {User} from '../models/User.model'
import {
    createBadRequestResponse,
    createTokenNotProvidedResponse,
    createUnauthorizedResponse,
    createUserNotFoundResponse,
    ErrorData
} from './responseHelpers'

type Nullable<T> = T | null

type RequestObjectWithHeader = {
    headers: {
        authorization: string
    }
}
export class LimitedAccessView {
    static authorizedUser: User | ErrorData
    protected static async getAuthorizedUser(obj: unknown): Promise<User | ErrorData> {
        this.authorizedUser = await this.getAuthorizedUserData(obj)
        return this.authorizedUser
    }
    static async getAuthorizedUserData(obj: unknown): Promise<User | ErrorData> {
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
}
