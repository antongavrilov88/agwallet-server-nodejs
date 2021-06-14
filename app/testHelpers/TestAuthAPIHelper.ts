import {AuthRoutes, createURL} from '../routes/constants'
import {TestAPIHelper} from './TestAPIHelper'

export class TestAuthAPIHelper extends TestAPIHelper {
    static createUser = async (signUpData: any) => {
        const newUser = await TestAPIHelper.request.post(
            signUpData,
            createURL(AuthRoutes.signUp)
        )
        return newUser
    }

    static signInUser = async (signInData: any) => {
        const newAuth = TestAPIHelper.request.post(
            signInData,
            createURL(AuthRoutes.signIn)
        )
        return newAuth
    }

    static signOut = async (token: any) => {
        const signOutResponse = TestAPIHelper.request.delete(
            {},
            createURL(AuthRoutes.signOut),
            token
        )
        return signOutResponse
    }
}
