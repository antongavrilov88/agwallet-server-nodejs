export const userDataRules = {
    headers: {
        authorization: 'required'
    },
    body: {
        email: 'required',
        password: 'required',
        admin: 'required'
    }
}
