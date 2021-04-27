import {db} from '../../models/indexTest'
import {app} from '../../appTest'
import {UserRoutes} from '../../routes/constans'

const request = require('supertest')

const user = {
    email: 'required',
    password: 'required',
    admin: true
}
// const headers = {
//     authorisation: 'fhgshg'
// }

describe('my api test', () => {
    it('Create user', async () => {
        await db.sequelize.sync({force: true})
        const {status} = await request(app)
            .post(UserRoutes.baseUserRoute + UserRoutes.root)
            .send(user)
        expect(status).toEqual(201)
    })
})
