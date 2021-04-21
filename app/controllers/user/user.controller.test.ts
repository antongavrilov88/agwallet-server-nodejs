// import { app } from "../../app"

const sum = (a: number, b: number) => a + b

test('Dummy unit test', () => {
    const actual = sum(1, 2)
    expect(actual).toBe(3)
})

// describe('test', () => {
//     it('should load list of users', async () => {
//     const users = await app
//         .post('/api/users/')

//         expect(users).toBeDefined()
//         expect(users.length).toEqual(3)
//     })
// })
