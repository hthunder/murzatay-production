import { countSymbols } from "./counter.js"
import { Comment, EditForm } from "./components/comment.js"

export const deleteCommentRequest = async (comment) => {
    const { parentNode, id, wrapper } = comment
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

export const toggleVisibility = (elements, classname) => {
    elements.forEach((elem) => {
        elem.classList.toggle(classname)
    })
}

const cancelEditing = (toggledElems, form) => {
    toggleVisibility([...toggledElems, form], "hidden")
}

const saveEditing = async (toggledElems, form, textarea, id) => {
    const [paragraphComment] = toggledElems
    await saveCommentRequest(paragraphComment, textarea.value, id)
    toggleVisibility([...toggledElems, form], "hidden")
}

export const editComment = (comment) => {
    const { deleteButton, editButton, wrapper, id } = comment

    const paragraphComment = wrapper.querySelector(".comments__instance-text")
    const paragraphText = paragraphComment.textContent
    const toggledElements = [paragraphComment, editButton, deleteButton]

    toggleVisibility(toggledElements, "hidden")

    const tempForm = document.querySelector(".comments__temp-form")
    if (!tempForm) {
        const formObj = EditForm(paragraphText)
        paragraphComment.after(formObj.form)

        formObj.saveButton.onclick = () => {
            saveEditing(toggledElements, formObj.form, formObj.textarea, id)
        }
        formObj.cancelButton.onclick = () => {
            cancelEditing(toggledElements, formObj.form)
        }

        countSymbols(formObj.counter, formObj.textarea)
    } else {
        tempForm.classList.toggle("hidden")
        tempForm.querySelector(".comments__add-textarea").value = paragraphText
        tempForm.querySelector(
            ".comments__symbol-counter"
        ).innerHTML = `${paragraphText.length}/500`
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
        comment.deleteButton = wrapper.querySelector(".comments__delete-button")
        comment.editButton = wrapper.querySelector(".comments__edit-button")
        comment.parentNode = wrapper.parentNode

        comment.deleteButton.onclick = () => {
            deleteCommentRequest(comment)
        }
        comment.editButton.onclick = () => {
            editComment(comment)
        }
    }
}

export const setListeners = () => {
    const wrappers = document.querySelectorAll(".comments__instance")
    const addCommentButton = document.querySelector(".comments__add-button")
    const addCommentTextarea = document.querySelector(".comments__add-textarea")
    wrappers.forEach((wrapper) => {
        const comment = {
            id: wrapper.dataset.id,
            wrapper,
        }
        comment.deleteButton = wrapper.querySelector(".comments__delete-button")
        comment.editButton = wrapper.querySelector(".comments__edit-button")
        comment.parentNode = wrapper.parentNode

        comment.deleteButton.onclick = () => {
            deleteCommentRequest(comment)
        }
        comment.editButton.onclick = () => {
            editComment(comment)
        }
    })
    addCommentButton.onclick = () => {
        addCommentRequest(addCommentButton, addCommentTextarea)
    }
}

setListeners()
countSymbols()
