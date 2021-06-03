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

export const setDisplayValue = (elements, value) => {
    elements.forEach((elem) => {
        const styledElem = elem
        styledElem.style.display = value
    })
}

const cancelEditing = (toggledElems, form) => {
    const editingForm = form
    editingForm.style.display = "none"
    setDisplayValue(toggledElems, "initial")
}

const saveEditing = async (toggledElems, form, textarea, id) => {
    const [paragraphComment] = toggledElems
    const editingForm = form
    await saveCommentRequest(paragraphComment, textarea.value, id)
    editingForm.style.display = "none"
    setDisplayValue(toggledElems, "initial")
}

export const editComment = (comment) => {
    const { deleteButton, editButton, wrapper, id } = comment

    const paragraphComment = wrapper.querySelector(".comments__instance-text")
    const paragraphText = paragraphComment.textContent
    const toggledElements = [paragraphComment, editButton, deleteButton]

    setDisplayValue(toggledElements, "none")

    let form
    let formNode

    if (!form) {
        form = EditForm(paragraphText)
        ;({ form: formNode } = form)
        paragraphComment.after(formNode)

        form.saveButton.onclick = () => {
            saveEditing(toggledElements, formNode, form.textarea, id)
        }
        form.cancelButton.onclick = () => {
            cancelEditing(toggledElements, formNode)
        }

        countSymbols(form.counter, form.textarea)
    } else {
        form.style.display = "initial"
        form.textarea.value = paragraphText
        form.counter.innerHTML = `${paragraphText.length}/500`
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
