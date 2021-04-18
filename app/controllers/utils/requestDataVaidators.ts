export const userDataRules = {
    headers: {
        authorization: 'required'
    },
    body: {
        displayName: 'required',
        avatar: 'required'
    }
}

export const recordDataRules = {
    headers: {
        authorization: 'required'
    },
    body: {
        title: 'required',
        content: 'required'
    }
}

export const userReactionDataRules = {
    headers: {
        authorization: 'required'
    },
    body: {
        reactionId: 'required'
    }
}
