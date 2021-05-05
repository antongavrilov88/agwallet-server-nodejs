// import {AuthRoutes} from '../../routes/constans'
// import {app} from '../../app'
// import {db} from '../../models/index'

// const request = require('supertest')

// const user = {
//     email: 'Anton',
//     password: '1234',
//     admin: true
// }

// beforeEach(async () => {
//     await db.sequelize.sync({force: true}).then(() => {
//     })
// })

// describe('jdfbh', () => {
//     it('should return Hello Test', async (done) => {
//         const data = await request(app)
//             .post(AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
//             .send(user)
//             .set('Accept', 'application/json')
//         // .end(done)
//         expect(data).toEqual(201)
//         done()
//     })
// })
import {AuthRoutes} from '../../routes/constants'
import {app} from '../../app'
import {db} from '../../models/index'

const request = require('supertest')

beforeEach(async (done) => {
    await db.sequelize.sync({force: true})
    done()
})

afterEach(async (done) => {
    // db.sequelize.drop()
    done()
})

const user = {
    email: 'Anton',
    password: 'qwerty1234',
    admin: true
}

describe('my api test', () => {
    it('Create user', async (done) => {
        await request(app)
            .post(AuthRoutes.baseAuthRoute + AuthRoutes.signUp)
            .send(user)
            .then(async (data: any) => {
                expect(20)
                expect(data).toBeDefined()
                expect(data).toEqual('Anton')
            })
        done()
    })
})
