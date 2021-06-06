// import {createURL, UserRoutes} from '../../routes/constants'
// import {
//     errors, createBadResponse, createSuccessResponse
// } from '../responseHelpers'
// import {User} from '../../models/User.model'
// import {LimitedAccessView} from '../LimitedAccessView'

// export class UserAPI extends LimitedAccessView {
//     static getData = (user:any, minimal = null) => {
//         const responseObject: any = {}
//         responseObject.type = 'users'
//         responseObject.id = user.id
//         responseObject.links = {
//             self: createURL(UserRoutes.root, user.id)
//         }
//         if (!minimal) {
//             responseObject.attributes = {
//                 email: user.email,
//                 admin: user.admin
//             }
//         }
//         return responseObject
//     }

//     get = async (req: any, res: any) => {
//         try {
//             const status = await UserAPI.limitAccess(req)
//             if (!status) {
//                 res.status(401).send(
//                     createBadResponse(errors.TOKEN_NOT_PROVIDED)
//                 )
//                 return
//             }

//             const {id} = req.params

//             if (!id) {
//                 const users = await User.findAll()

//                 res.status(200).send(createSuccessResponse(
//                     users.map((user: any) => UserAPI.getData(user))
//                 ))
//             } else {
//                 const user = await User.findOne({where: {id}})
//                 if (user === null) {
//                     res.status(404).send(
//                         createBadResponse(errors.USER_NOT_FOUND)
//                     )
//                     return
//                 }
//                 res.status(200).send(
//                     createSuccessResponse(UserAPI.getData(user))
//                 )
//             }
//         } catch (err) {
//             res.status(500).send(
//                 createBadResponse(errors.INTERNAL_ERROR)
//             )
//         }
//     }
// }
