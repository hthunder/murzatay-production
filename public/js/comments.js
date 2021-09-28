import { countSymbols } from "./counter"
import { EditForm, CommentTextarea, CommentJS } from "./components/comment"

const allCommentsPlace = document.querySelector(".topic__js-comments")
const articleId = allCommentsPlace.dataset.id

export const deleteCommentRequest = async (commentEl) => {
    try {
        const res = await fetch(`/api/comments/${commentEl.dataset.id}`, {
            method: "DELETE",
        })
        if (res.status === 200) {
            return commentEl.parentNode.removeChild(commentEl)
        }
        throw new Error("Не удалось удалить комментарий")
    } catch (e) {
        return console.error(e.message)
    }
}

const toggleEditingState = (commentContent, formEl) => {
    commentContent.classList.toggle("comments__instance-content_hidden")
    formEl.classList.toggle("comments__temp-form_hidden")
}

export const saveCommentRequest = async (
    newText,
    id,
    commentContent,
    formEl
) => {
    try {
        const paragraph = commentContent.querySelector(
            ".comments__instance-text"
        )
        if (newText !== paragraph.textContent) {
            const res = await fetch(`/api/comments/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: newText }),
            })
            if (res.status === 200) {
                const resObj = await res.json()
                paragraph.textContent = resObj.text
                return toggleEditingState(commentContent, formEl)
            }
            throw new Error("Не удалось сохранить изменения")
        } else {
            return toggleEditingState(commentContent, formEl)
        }
    } catch (e) {
        return console.error(e.message)
    }
}

const createTempForm = (commentText, commentEl, commentContentEl) => {
    const formEl = EditForm(commentText, commentEl.dataset.id)
    const textareaEl = formEl.querySelector(".sc-textarea__textarea")
    const counterEl = formEl.querySelector(".comments__symbol-counter")
    const cancelButtonEl = formEl.querySelector(".comments__cancel-button")
    const saveButtonEl = formEl.querySelector(".comments__save-button")

    commentEl.appendChild(formEl)
    saveButtonEl.onclick = () => {
        saveCommentRequest(
            textareaEl.value,
            commentEl.dataset.id,
            commentContentEl,
            formEl
        )
    }
    cancelButtonEl.onclick = () => {
        commentContentEl.classList.toggle("comments__instance-content_hidden")
        formEl.classList.toggle("comments__temp-form_hidden")
    }
    countSymbols(counterEl, textareaEl)
}

export const editComment = (commentEl) => {
    const commentText = commentEl.querySelector(
        ".comments__instance-text"
    ).textContent
    const commentContentEl = commentEl.querySelector(
        ".comments__instance-content"
    )
    const tempFormEl = document.querySelector(
        `.comments__temp-form[data-id='${commentEl.dataset.id}']`
    )

    commentContentEl.classList.toggle("comments__instance-content_hidden")
    if (!tempFormEl) {
        createTempForm(commentText, commentEl, commentContentEl)
    } else {
        tempFormEl.classList.toggle("comments__temp-form_hidden")
        tempFormEl.querySelector(".sc-textarea__textarea").value = commentText
        tempFormEl.querySelector(
            ".comments__symbol-counter"
        ).innerHTML = `${commentText.length}/500`
    }
}

export const addCommentRequest = async (textarea) => {
    try {
        const res = await fetch(`/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                articleId,
                text: textarea.value,
            }),
        })
        if (res.status === 200) {
            const commentData = await res.json()
            textarea.value = ""
            textarea.dispatchEvent(new Event("input"))
            const commentEl = CommentJS(
                commentData,
                deleteCommentRequest,
                editComment
            )
            return document
                .querySelector(".topic__js-comments")
                .prepend(commentEl)
        }
        throw new Error("Не удалось добавить новый комментарий")
    } catch (e) {
        return console.error(e.message)
    }
}

const getCommentsRequest = async () => {
    try {
        const res = await fetch(`/api/articles/${articleId}/comments`)
        if (res.status === 200) {
            const commentsData = await res.json()

            return commentsData.forEach((commentData) => {
                allCommentsPlace.appendChild(
                    CommentJS(commentData, deleteCommentRequest, editComment)
                )
            })
        }
        throw new Error("Произошел сбой при получении списка комментариев")
    } catch (e) {
        return console.error(e.message)
    }
}

export const commentsInit = async () => {
    const addCommentPlace = document.querySelector(".topic__js-add-comment")

    if (addCommentPlace) {
        const formEl = CommentTextarea()
        addCommentPlace.appendChild(formEl)
        const addButton = formEl.querySelector(".comments__add-button")
        const textarea = formEl.querySelector(".sc-textarea__textarea")
        countSymbols()
        addButton.onclick = () => {
            if (textarea.value !== "") {
                addCommentRequest(textarea)
            }
        }
    }
    await getCommentsRequest()
}
