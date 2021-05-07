import {app} from '../../app'
import {db} from '../../models/index'
import {userRoutes} from '../../routes/user.routes'
import {authRoutes} from '../../routes/auth.routes'
import {TestAPIHelper} from '../TestAPIHelper'
import {
    signInUser, signInUserWrongPassword, signUpUser
} from '../TestRequestObjects'

userRoutes(app)
authRoutes(app)

beforeEach(async (done) => {
    await db.sequelize.sync({force: true}).then(() => {
    })
    done()
})

describe('Auth API tests', () => {
    it('Should return 201 response status and token to signup request with valid data', async (done) => {
        const newUser: any = await TestAPIHelper.createUser(signUpUser)
        expect(newUser.status).toEqual(201)
        expect(JSON.parse(newUser.text).data.type).toEqual('auth')
        expect(JSON.parse(newUser.text).data.attributes.token).toBeDefined()
        done()
    })
    it('Should return 409 response status to signup request with existing email', async (done) => {
        await TestAPIHelper.createUser(signUpUser)
        const conflictUserResponse: any = await TestAPIHelper.createUser(signUpUser)
        expect(conflictUserResponse.status).toEqual(409)
        done()
    })
    it('Should return 409 response status to signin request with user already in system', async (done) => {
        await TestAPIHelper.createUser(signUpUser)
        const conflictUserResponse: any = await TestAPIHelper.signInUser(signInUser)
        expect(conflictUserResponse.status).toEqual(409)
        done()
    })
    it('Should return 200 response status to signout request with user valid data', async (done) => {
        const newUser: any = await TestAPIHelper.createUser(signUpUser)
        const {token} = JSON.parse(newUser.text).data.attributes
        const signOutResponse: any = await TestAPIHelper.signOut(token)
        expect(signOutResponse.status).toEqual(200)
        done()
    })
    it('Should return 201 response status to signin request with valid data', async (done) => {
        const newUser: any = await TestAPIHelper.createUser(signUpUser)
        const {token} = JSON.parse(newUser.text).data.attributes
        await TestAPIHelper.signOut(token)
        const signInResponse = await TestAPIHelper.signInUser(signInUser)
        expect(signInResponse.status).toEqual(201)
        done()
    })
    it('Should return 401 response status to signin request with wrong password', async (done) => {
        const newUser: any = await TestAPIHelper.createUser(signUpUser)
        const {token} = JSON.parse(newUser.text).data.attributes
        await TestAPIHelper.signOut(token)
        const wrongSignInResponse = await TestAPIHelper.signInUser(signInUserWrongPassword)
        expect(wrongSignInResponse.status).toEqual(401)
        done()
    })
})
