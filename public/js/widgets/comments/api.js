import { ajax } from "rxjs/ajax"

export const getInitial = (articleId) => {
    return ajax(`/api/articles/${articleId}/comments`)
}

export const send = (articleId, text) => {
    return ajax({
        url: `/api/comments`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            articleId,
            text,
        }),
    })
}

export const remove = (commentId) => {
    return ajax({
        url: `/api/comments/${commentId}`,
        method: "DELETE",
    })
}

export const saveEdited = (commentId, text) => {
    return ajax({
        url: `/api/comments/${commentId}`,
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    })
}
