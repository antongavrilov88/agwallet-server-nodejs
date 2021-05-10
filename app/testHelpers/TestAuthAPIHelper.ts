import {apiVersion} from '../controllers/config'
import {baseUrl, AuthRoutes} from '../routes/constants'
import {TestAPIHelper} from './TestAPIHelper'

export class TestAuthAPIHelper extends TestAPIHelper {
    static createUser = async (signUpData: any) => {
        const newUser = TestAPIHelper.request.post(
            signUpData,
            baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signUp
        )
        return newUser
    }

    static signInUser = async (signInData: any) => {
        const newAuth = TestAPIHelper.request.post(
            signInData,
            baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signIn
        )
        return newAuth
    }

    static signOut = async (token: any) => {
        const signOutResponse = TestAPIHelper.request.delete(
            {},
            baseUrl + apiVersion + AuthRoutes.baseAuthRoute + AuthRoutes.signOut,
            token
        )
        return signOutResponse
    }
}
