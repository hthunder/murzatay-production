import { countSymbols } from "./counter.js"
import { Comment, EditForm } from "./components/comment.js"

export const deleteCommentRequest = async (comment) => {
    const { parentNode, id, instance } = comment
    const res = await fetch(`/api/comments/${id}`, { method: "DELETE" })
    if (res.status === 200) {
        parentNode.removeChild(wrapper)
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

const saveEditing = async (comment, editingForm, textareaVal, id) => {
    await saveCommentRequest(
        comment.querySelector(".comments__instance-text"),
        textareaVal,
        id
    )
    comment.classList.toggle("comments__instance-content_hidden")
    editingForm.classList.toggle("comments__temp-form_hidden")
}

// comment {
//     editingMode: false,
//     stateComment: '',

// }

export const editComment = (comment) => {
    const { instance, id } = comment
    const instanceText = instance.querySelector(".comments__instance-text")
        .textContent
    const instanceContent = instance.querySelector(
        ".comments__instance-content"
    )
    const tempForm = document.querySelector(".comments__temp-form")

    instanceContent.classList.toggle("comments__instance-content_hidden")
    if (!tempForm) {
        const { form, textarea, counter, cancelButton, saveButton } = EditForm(
            instanceText
        )

        instance.appendChild(form)
        saveButton.onclick = () => {
            saveEditing(instanceContent, form, textarea.value, id)
        }
        cancelButton.onclick = () => {
            cancelEditing(instanceContent, form)
        }
        countSymbols(counter, textarea)
    } else {
        tempForm.classList.toggle("comments__temp-form_hidden")
        tempForm.querySelector(".comments__add-textarea").value = instanceText
        tempForm.querySelector(
            ".comments__symbol-counter"
        ).innerHTML = `${instanceText.length}/500`
    }

    // Санитайзим пользовательский ввод
    // Если запрос неуспешен, то возвращаем параграф и кнопку редактировать и убираем кнопку сохранить
    // Добавляем всплывающий алерт(неблокирующий), который говорит, что произошла ошибка
}

export const addCommentRequest = async (button, textarea) => {
    const textareaPtr = textarea
    const data = {
        articleId: button.dataset.id,
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
        const wrapper = Comment(commentData)
        document.querySelector(".comments__add-form").after(wrapper)

        const comment = {
            id: wrapper.dataset.id,
            wrapper,
        }
        const deleteButton = wrapper.querySelector(".comments__delete-button")
        const editButton = wrapper.querySelector(".comments__edit-button")
        comment.parentNode = wrapper.parentNode

        deleteButton.onclick = () => {
            deleteCommentRequest(comment)
        }
        editButton.onclick = () => {
            editComment(comment)
        }
    }
}

export const setListeners = () => {
    const wrappers = document.querySelectorAll(".comments__instance")
    const addCommentButton = document.querySelector(".comments__add-button")
    const addCommentTextarea = document.querySelector(".comments__add-textarea")
    wrappers.forEach((instance) => {
        const comment = {
            id: instance.dataset.id,
            instance,
        }
        comment.deleteButton = instance.querySelector(
            ".comments__delete-button"
        )
        comment.editButton = instance.querySelector(".comments__edit-button")
        comment.parentNode = instance.parentNode

        if (comment.deleteButton) {
            comment.deleteButton.onclick = () => {
                deleteCommentRequest(comment)
            }
        }
        
        if (comment.editButton) {
            comment.editButton.onclick = () => {
                editComment(comment)
            }
        }
        
    })
    if (addCommentButton) {
        addCommentButton.onclick = () => {
            addCommentRequest(addCommentButton, addCommentTextarea)
        }   
    }
}

setListeners()
countSymbols()
