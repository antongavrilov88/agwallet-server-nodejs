import {apiVersion} from './config'
import {
    DefaultObject, Error, ResponseData
} from './types'

export const makeErrorObject = (code: string, title: string) => ({
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
        copyright: 'Anton Gavrilov',
        authors: [
            'Anton Gavrilov'
        ]
    }
})

export const errorResponseObject = (error: any) => {
    const responseObject: DefaultObject<Error> = defaultResponseObject()
    responseObject.errors = {
        code: error.code,
        title: error.title
    }
    return responseObject
}

export const successResponseObject = (data: ResponseData) => {
    const responseObject: DefaultObject<ResponseData> = defaultResponseObject()
    responseObject.data = data
    return responseObject
}

export const createSuccessResponse = (data: any) => successResponseObject(data)

// eslint-disable-next-line max-len
export const createErrorResponse = (error: Error) => {
    const responseObject = errorResponseObject(error)
    return {
        responseObject
    }
}

export const createErrorData = (code: number, message: any) => ({
    code,
    message
})

export const createBadRequestResponse = () => createErrorData(400, errors.WRONG_API)

export const createAuthConflictResponse = () => createErrorData(409, errors.AUTH_CONFLICT)

export const createInternalErrorResponse = () => createErrorData(500, errors.INTERNAL_ERROR)

export const createUnauthorizedResponse = () => createErrorData(401, errors.UNAUTHORIZED)

export const createUserConflictResponse = () => createErrorData(409, errors.USER_CONFLICT)
