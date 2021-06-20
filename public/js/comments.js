import { countSymbols } from "./counter"
import { EditForm, CommentTextarea, CommentJS } from "./components/comment"

export const deleteCommentRequest = async (commentEl) => {
    const res = await fetch(`/api/comments/${commentEl.dataset.id}`, {
        method: "DELETE",
    })
    if (res.status === 200) {
        commentEl.parentNode.removeChild(commentEl)
    }
}

export const saveCommentRequest = async (commentNode, text, id) => {
    const paragraphComment = commentNode
    const res = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    })
    if (res.status === 200) {
        const newText = await res.json()
        paragraphComment.textContent = newText.text
    }
}

const cancelEditing = (comment, editingForm) => {
    comment.classList.toggle("comments__instance-content_hidden")
    editingForm.classList.toggle("comments__temp-form_hidden")
}

const saveEditing = async (commentContent, formEl, commentEl, textareaEl) => {
    await saveCommentRequest(
        commentContent.querySelector(".comments__instance-text"),
        textareaEl.value,
        commentEl.dataset.id
    )
    commentContent.classList.toggle("comments__instance-content_hidden")
    formEl.classList.toggle("comments__temp-form_hidden")
}

const createTempForm = (commentText, commentEl, commentContentEl) => {
    const formEl = EditForm(commentText, commentEl.dataset.id)
    const textareaEl = formEl.querySelector(".sc-textarea__textarea")
    const counterEl = formEl.querySelector(".comments__symbol-counter")
    const cancelButtonEl = formEl.querySelector(".comments__cancel-button")
    const saveButtonEl = formEl.querySelector(".comments__save-button")

    commentEl.appendChild(formEl)
    saveButtonEl.onclick = () => {
        saveEditing(commentContentEl, formEl, commentEl, textareaEl)
    }
    cancelButtonEl.onclick = () => {
        cancelEditing(commentContentEl, formEl)
    }
    countSymbols(counterEl, textareaEl)
}

export const editComment = (commentEl) => {
    const commentText = commentEl.querySelector(".comments__instance-text")
        .textContent
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

    // Санитайзим пользовательский ввод
    // Если запрос неуспешен, то возвращаем параграф и кнопку редактировать и убираем кнопку сохранить
    // Добавляем всплывающий алерт(неблокирующий), который говорит, что произошла ошибка
}

export const addCommentRequest = async (articleId, textarea) => {
    const textareaPtr = textarea
    const data = {
        articleId,
        text: textarea.value,
    }
    const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (res.status === 200) {
        const commentData = await res.json()
        textareaPtr.value = ""
        const event = new Event("input")
        textareaPtr.dispatchEvent(event)
        const commentEl = CommentJS(commentData)
        document.querySelector(".comments__add-form").after(commentEl)

        const deleteButton = commentEl.querySelector(".comments__delete-button")
        const editButton = commentEl.querySelector(".comments__edit-button")

        deleteButton.onclick = () => {
            deleteCommentRequest(commentEl)
        }
        editButton.onclick = () => {
            editComment(commentEl)
        }
    }
}

const getComments = async () => {
    const addCommentPlace = document.querySelector(".topic__js-add-comment")
    const allCommentsPlace = document.querySelector(".topic__js-comments")
    const articleId = allCommentsPlace.dataset.id
    if (addCommentPlace) {
        const formEl = CommentTextarea()
        addCommentPlace.appendChild(formEl)
        const addButton = formEl.querySelector(".comments__add-button")
        const textarea = formEl.querySelector(".sc-textarea__textarea")
        addButton.onclick = () => {
            addCommentRequest(articleId, textarea)
        }
    }

    const res = await fetch(`/api/articles/${articleId}/comments`)
    if (res.status === 200) {
        const commentsData = await res.json()
        console.log(commentsData)
        const commentsArray = commentsData.map((commentData) =>
            CommentJS(commentData)
        )
        commentsArray.forEach((el) => {
            allCommentsPlace.appendChild(el)
        })
    }
}

export const commentsInit = async () => {
    await getComments()
    const commentsNodeList = document.querySelectorAll(".comments__instance")
    commentsNodeList.forEach((commentEl) => {
        const deleteButtonEl = commentEl.querySelector(
            ".comments__delete-button"
        )
        const editButtonEl = commentEl.querySelector(".comments__edit-button")

        if (deleteButtonEl) {
            deleteButtonEl.onclick = () => {
                deleteCommentRequest(commentEl)
            }
        }

        if (editButtonEl) {
            editButtonEl.onclick = () => {
                editComment(commentEl)
            }
        }
    })
}

countSymbols()
