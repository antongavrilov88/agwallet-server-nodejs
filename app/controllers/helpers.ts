import {db} from '../models/index'
import {apiVersion} from './config'
import {
    DefaultObject, ErrorData, Error, ResponseData
} from './types'

const Token = db.tokens

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
    TOKEN_NOT_PROVIDED: makeErrorObject('TokenNotProvided', 'Token not provided')
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

export const createSuccssResponse = (data: any) => successResponseObject(data)

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
    constructor(header: string) {
        let token = null
        if (header) {
            const authorization = header.split(' ')
            if (authorization.length !== 2) {
                return errors.TOKEN_NOT_PROVIDED
            }
            // eslint-disable-next-line prefer-destructuring
            token = authorization[1]
        } else {
            token = ''
        }
        if (token) {
            if (!Token) {
                return false
            }
        }
    }
}
