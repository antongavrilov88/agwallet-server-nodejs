import {User} from '../models/User.model'
import {Auth} from './helpers'
import {ErrorData} from './responseHelpers'

export class LimitedAccessView {
    static authorizedUser: User | ErrorData
    static async getAuthorizedUser(obj: unknown): Promise<User | ErrorData> {
        this.authorizedUser = await Auth.getAuthorizedUserData(obj)
        return this.authorizedUser
    }
}
