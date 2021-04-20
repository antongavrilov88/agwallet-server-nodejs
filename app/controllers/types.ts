export type DefaultObject<U> = {
    jsonapi: {
        version: string
    },
    meta: {
        copyright: string,
        authors: string[]
    },
    errors?: U,
    data?: U
}

export type Error = {
    code: string,
    title: string
}

export type ErrorData = Error[]
