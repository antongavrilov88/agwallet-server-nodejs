import {Auth} from './helpers'

export class LimitedAccessView {
    static auth: any
    static async limitAccess(req: any) {
        this.auth = await Auth.status(req.headers.authorization)
        return this.auth ? this.auth : false
    }
}
