import {Auth} from './helpers'

export class LimitedAccessView {
    static authStatus: boolean
    static async isLimitedAccessGranted(token: string): Promise<boolean> {
        this.authStatus = await Auth.status(token)
        return this.authStatus
    }
}
