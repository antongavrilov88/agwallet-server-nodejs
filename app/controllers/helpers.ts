import {db} from '../models/index'
import {apiVersion} from './config'
import {
    DefaultObject, ErrorData, Error, ResponseData
} from './types'

const Token = db.tokens
const User = db.users

const makeErrorObject = (code: string, title: string) => ({
    code,
    title
})

export const errors: Record<any, Error> = {
    WRONG_API: makeErrorObject('WrongAPI', 'Wrong API'),
    AUTH_CONFLICT: makeErrorObject('UserAlreadyInSystem', 'User already in system'),
    INTERNAL_ERROR: makeErrorObject('InternalError', 'Something went wrong'),
    UNAUTHORIZED: makeErrorObject('Unauthorized', 'Unauthorized'),
    NOT_FOUND: makeErrorObject('NotFound', 'Not found'),
    FORBIDDEN: makeErrorObject('AccessDenied', 'Access denied'),
    TOKEN_NOT_PROVIDED: makeErrorObject('TokenNotProvided', 'Token not provided'),
    USER_NOT_FOUND: makeErrorObject('UserNotFound', 'User not found'),
    USER_CONFLICT: makeErrorObject('UserAlreadyExists', 'User already exists'),
    WRONG_PASSWORD: makeErrorObject('WrongPassword', 'Wrong password')
}

export const defaultResponseObject = () => ({
    jsonapi: {
        version: apiVersion
    },
    meta: {
        copyright: 'AGwallet server',
        authors: [
            'Anton Gavrilov'
        ]
    }
})

export const errorResponseObject = (error: Error) => {
    const responseObject: DefaultObject<ErrorData> = defaultResponseObject()
    responseObject.errors = [{
        code: error.code,
        title: error.title
    }]
    return responseObject
}

export const successResponseObject = (data: ResponseData) => {
    const responseObject: DefaultObject<ResponseData> = defaultResponseObject()
    responseObject.data = data
    return responseObject
}

export const createSuccessResponse = (data: any) => successResponseObject(data)

export const createBadResponse = (error: Error) => errorResponseObject(error)

export const checkUserStatus = async (token: any) => {
    const status = Token.findOne({where: {token}})
        .then((data: any) => (data !== null ? data.id : false))
        .catch((err: {message: any}) => {
            console.log(err)
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
                    .catch((err: {message: any}) => {
                        console.log(err)
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
