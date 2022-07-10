import { TextAreaWithCounter } from "./TextAreaWithCounter"
import { DateTime } from "./DateTime"
import { ml } from "../utils/mark"

// TODO добавить здесь в методы эскейпинг и преобразование даты
export class Comment {
    constructor(data) {
        Object.assign(this, {
            id: data._id,
            text: data.text,
            date: data.date,
            user: data.user,
            isDeletable: data.isDeletable,
            isEditable: data.isEditable,
        })

        this.createNonEditModeMarkup()
        this.createEditModeMarkup()
        this.element = ml("article", { class: "comments__instance" }, [
            ml("img", {
                class: "comments__instance-ava",
                src: `/static${
                    this.user.avatar || "/img/icons/user-profile.svg"
                }`,
                alt: "Аватарка",
            }),
            ml("div", { class: "comments__instance-content" }, [
                this.content,
                this.commentsForm,
            ]),
        ])
    }

    async deleteComment() {
        try {
            const res = await fetch(`/api/comments/${this.id}`, {
                method: "DELETE",
            })
            if (res.ok) {
                return this.element.parentNode.removeChild(this.element)
            }
            throw new Error("Не удалось удалить комментарий")
        } catch (e) {
            return console.error(e.message)
        }
    }

    async saveComment() {
        const isChanged =
            this.textarea.value !== "" &&
            this.textarea.value !== this.nodeWithText.textContent

        try {
            // TODO поправить пут на патч
            // TODO сделать так, чтобы раут возвращал весь комментарий целиком
            if (isChanged) {
                const res = await fetch(`/api/comments/${this.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: this.textarea.value }),
                })
                if (res.ok) {
                    const { text } = await res.json()
                    this.nodeWithText.textContent = text
                    return this.changeEditMode()
                }
                throw new Error("Не удалось сохранить изменения")
            }
            return this.changeEditMode()
        } catch (e) {
            return console.error(e.message)
        }
    }

    editComment() {
        this.textarea.value = this.nodeWithText.textContent
        this.changeEditMode()
        this.textarea.focus()
        this.textarea.setSelectionRange(
            this.textarea.value.length,
            this.textarea.value.length
        )
    }

    changeEditMode() {
        this.content.classList.toggle("hidden")
        this.commentsForm.classList.toggle("hidden")
    }

    createEditModeMarkup() {
        const [textareaWrapper, textarea] = TextAreaWithCounter(500, this.text)
        this.textareaWrapper = textareaWrapper
        this.textarea = textarea

        this.commentsForm = ml("form", { class: "comments__form hidden" }, [
            this.textareaWrapper,
            ml(
                "button",
                {
                    class: "comments__save-button button",
                    type: "button",
                    onClick: this.saveComment.bind(this),
                },
                "Сохранить"
            ),
            ml(
                "button",
                {
                    class: "comments__cancel-button button",
                    type: "button",
                    onClick: this.changeEditMode.bind(this),
                },
                "Отменить"
            ),
        ])
    }

    createNonEditModeMarkup() {
        if (this.isDeletable) {
            this.deleteBtn = ml(
                "button",
                {
                    class: "button button_secondary comments__delete-button",
                    type: "button",
                    onClick: this.deleteComment.bind(this),
                },
                "Удалить"
            )
        }

        if (this.isEditable) {
            this.editBtn = ml(
                "button",
                {
                    class: "button comments__edit-button",
                    type: "button",
                    onClick: this.editComment.bind(this),
                },
                "Редактировать"
            )
        }

        this.nodeWithText = ml(
            "p",
            { class: "comments__instance-text" },
            this.text
        )

        this.content = ml("div", { class: "comments__content" }, [
            ml("p", { class: "comments__instance-author" }, this.user.username),
            this.nodeWithText,
            DateTime(this.date),
            ml("div", {}, [this.editBtn, this.deleteBtn]),
        ])
    }
}
