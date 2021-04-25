import {db} from '../../models/indexTest'
import {app} from '../../appTest'
import {UserRoutes} from '../../routes/constans'

const request = require('supertest')

describe('my api test', () => {
    it('Post /users/', async () => {
        await db.sequelize.sync({force: true})
        const {status} = await request(app).post(UserRoutes.baseUserRoute + UserRoutes.root, {
            headers: {
                authorization: 'required'
            },
            body: {
                displayName: 'required',
                avatar: 'required'
            }
        })
        expect(status).toEqual(400)
    })
})
