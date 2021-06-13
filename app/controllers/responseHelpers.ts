import {apiVersion} from './config'

export type Error = {
    code: string,
    title: string
}

export type DefaultObject<U> = {
    jsonapi: {
        version: string
    },
    meta: {
        copyright: string,
        authors: string[]
    },
    errors?: U,
    data?: U
}

export type ErrorData = {
    status: number,
    message: Error
}

export type ResponseData = any

export const makeErrorObject = (code: string, title: string): Error => ({
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
    WRONG_PASSWORD: makeErrorObject('WrongPassword', 'Wrong password'),
    USER_ID_NOT_PROVIDED: makeErrorObject('UserIdNotProvided', 'User id not provided')
}

export const isErrorResponse = (obj: unknown): obj is ErrorData => (
    typeof obj === 'object'
        && obj !== null
        && 'status' in obj
        && 'message' in obj
)

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

export const errorResponseObject = (error: Error) => {
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

export const createErrorResponse = (error: Error) => {
    const responseObject = errorResponseObject(error)
    return {
        responseObject
    }
}

export const createErrorData = (status: number, message: Error): ErrorData => ({
    status,
    message
})

export const createBadRequestResponse = () => createErrorData(400, errors.WRONG_API)

export const createAuthConflictResponse = () => createErrorData(409, errors.AUTH_CONFLICT)

export const createInternalErrorResponse = () => createErrorData(500, errors.INTERNAL_ERROR)

export const createUnauthorizedResponse = () => createErrorData(401, errors.UNAUTHORIZED)

export const createUserConflictResponse = () => createErrorData(409, errors.USER_CONFLICT)

export const createNotFoundResponse = () => createErrorData(404, errors.NOT_FOUND);

export const createNoUserIdResponse = () => createErrorData(400, errors.USER_ID_NOT_PROVIDED)

export const createUserNotFoundResponse = () => createErrorData(404, errors.USER_NOT_FOUND)
