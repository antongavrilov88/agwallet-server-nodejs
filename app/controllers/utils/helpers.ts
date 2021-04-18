import {db} from '../../models/index'

const Token = db.tokens

export const checkUserStatus = async (token: any) => {
    const status = Token.findOne({where: {token}})
        .then((data: any) => (data !== null ? data.id : false))
        .catch((err: {message: any}) => {
            console.log(err)
        })
    return await status
}

export enum ErrorName {
    WRONG_API = 'Wrong API',
    AUTH_CONFLICT = 'User already in system',
    RECORD_REACTION_CONFLICT = 'Reaction is already set',
    INTERNAL_ERROR = 'Something went wrong',
    UNAUTHORIZED = 'Unauthorized',
    NOT_FOUND = 'Not found',
    FORBIDDEN = 'Access denied'
}

export const createBadResponse = (errorName: ErrorName) => ({
    message: errorName
})
