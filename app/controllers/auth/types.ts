export type SignUpData = {
    body: {
        data: {
            type: string,
            attributes: {
                email: string,
                password: string
            }
        }
    }
}

export type SignInData = {
    body: {
        data: {
            type: string,
            attributes: {
                email: string,
                password: string
            }
        }
    }
}

export const isSignUpData = (obj: SignUpData) => obj.body.data.type === 'auth'
