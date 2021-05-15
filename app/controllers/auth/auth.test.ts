import {app} from '../../app'
import {sequelize} from '../../config/db.config'
import {TestAuthAPIHelper} from '../../testHelpers/TestAuthAPIHelper'
import {
    signInUser, signInUserWrongPassword, signUpUser
} from '../../testHelpers/TestRequestObjects'
import {router} from '../../routes/index'

router(app)

beforeEach(async (done) => {
    await sequelize.sync({force: true}).then(() => {
    })
    done()
})

describe('Auth API tests', () => {
    it('Should return 201 response status and token to signup request with valid data', async (done) => {
        const newUser: any = await TestAuthAPIHelper.createUser(signUpUser)
        expect(newUser.status).toEqual(201)
        expect(JSON.parse(newUser.text).data.type).toEqual('auth')
        expect(JSON.parse(newUser.text).data.attributes.token).toBeDefined()
        done()
    })
    it('Should return 409 response status to signup request with existing email', async (done) => {
        await TestAuthAPIHelper.createUser(signUpUser)
        const conflictUserResponse: any = await TestAuthAPIHelper.createUser(signUpUser)
        expect(conflictUserResponse.status).toEqual(409)
        done()
    })
    it('Should return 409 response status to signin request with user already in system', async (done) => {
        await TestAuthAPIHelper.createUser(signUpUser)
        const conflictUserResponse: any = await TestAuthAPIHelper.signInUser(signInUser)
        expect(conflictUserResponse.status).toEqual(409)
        done()
    })
    it('Should return 200 response status to signout request with user valid data', async (done) => {
        const newUser: any = await TestAuthAPIHelper.createUser(signUpUser)
        const {token} = JSON.parse(newUser.text).data.attributes
        const signOutResponse: any = await TestAuthAPIHelper.signOut(token)
        expect(signOutResponse.status).toEqual(200)
        done()
    })
    it('Should return 201 response status to signin request with valid data', async (done) => {
        const newUser: any = await TestAuthAPIHelper.createUser(signUpUser)
        const {token} = JSON.parse(newUser.text).data.attributes
        await TestAuthAPIHelper.signOut(token)
        const signInResponse = await TestAuthAPIHelper.signInUser(signInUser)
        expect(signInResponse.status).toEqual(201)
        done()
    })
    it('Should return 401 response status to signin request with wrong password', async (done) => {
        const newUser: any = await TestAuthAPIHelper.createUser(signUpUser)
        const {token} = JSON.parse(newUser.text).data.attributes
        await TestAuthAPIHelper.signOut(token)
        const wrongSignInResponse = await TestAuthAPIHelper.signInUser(signInUserWrongPassword)
        expect(wrongSignInResponse.status).toEqual(401)
        done()
    })
})
