export const signUpUser = {
    data: {
        type: 'auth',
        attributes: {
            email: 'Anton',
            password: '1234'
        }
    }
}

export const signInUser = {
    data: {
        type: 'auth',
        attributes: {
            email: 'Anton',
            password: '1234'
        }
    }
}

export const signInUserWrongPassword = {
    data: {
        type: 'auth',
        attributes: {
            email: 'Anton',
            password: '12shdg'
        }
    }
}
