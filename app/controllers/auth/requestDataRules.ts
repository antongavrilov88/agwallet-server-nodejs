export const signUpDataRules = {
    body: {
        email: 'required',
        password: 'required',
        admin: 'required'
    }
}

export const signInDataRules = {
    body: {
        email: 'required',
        password: 'required'
    }
}
