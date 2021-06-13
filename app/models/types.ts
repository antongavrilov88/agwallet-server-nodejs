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
