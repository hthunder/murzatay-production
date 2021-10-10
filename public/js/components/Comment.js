import { countSymbols } from "../countSymbols"

const getInnerHTML = (
    avatar,
    username,
    text,
    date,
    isDeletable,
    isEditable
) => {
    const isoDate = new Date(date).toISOString()
    const localeDate = new Date(date).toLocaleString("en-GB")
    return `<img class="comments__instance-ava" src="${avatar}" alt="Аватарка">
            <div class="comments__instance-content">
                <div class="comments__content">
                    <p class="comments__instance-author">${username}</p>
                    <p class="comments__instance-text">${text}</p>
                    <time class="comments__instance-date" datetime="${isoDate}">
                    ${localeDate}
                    </time>
                </div>
                <form class="comments__form">
                    <article class="textarea textarea_medium sc-textarea comments__sc-textarea hidden">
                        <p class="sc-textarea__counter comments__symbol-counter">0/500</p>
                        <textarea class="sc-textarea__textarea" maxlength="500">${text}</textarea>
                    </article>
                    <button class="comments__save-button button hidden" type="button">Сохранить</button>
                    <button class="comments__cancel-button button hidden" type="button">Отменить</button>
                    ${
                        isDeletable &&
                        `<button class="button comments__delete-button" type="button">
                            Удалить
                        </button>`
                    }
                    ${
                        isEditable &&
                        `<button class="button comments__edit-button" type="button">
                            Редактировать
                        </button>`
                    }
                </form>
            </div>`
}
// TODO добавить здесь в методы эскейпинг и преобразование даты
export class Comment {
    constructor(
        {
            text,
            _id,
            user: { username, avatar = "/img/icons/user-profile.svg" },
            date,
            isDeletable,
            isEditable,
        },
        articleId
    ) {
        this.element = document.createElement("article")
        this.element.classList.add("comments__instance")
        this.id = _id
        this.editMode = false
        this.articleId = articleId
        this.element.innerHTML = getInnerHTML(
            avatar,
            username,
            text,
            date,
            isDeletable,
            isEditable
        )
        this.textarea = this.element.querySelector(".sc-textarea__textarea")
        this.nodeWithText = this.element.querySelector(
            ".comments__instance-text"
        )
        this.textareaWrapper = this.element.querySelector(
            ".comments__sc-textarea"
        )
        this.deleteBtn = this.element.querySelector(".comments__delete-button")
        this.editBtn = this.element.querySelector(".comments__edit-button")
        this.saveBtn = this.element.querySelector(".comments__save-button")
        this.cancelBtn = this.element.querySelector(".comments__cancel-button")
        this.content = this.element.querySelector(".comments__content")
        this.counter = this.element.querySelector(".comments__symbol-counter")
        countSymbols(this.counter, this.textarea)
    }

    changeEditMode() {
        this.editMode = !this.editMode
        ;[
            this.content,
            this.editBtn,
            this.deleteBtn,
            this.textareaWrapper,
            this.saveBtn,
            this.cancelBtn,
        ].forEach((element) => {
            this.changeVisibillity(element)
        })
    }

    // eslint-disable-next-line class-methods-use-this
    changeVisibillity(element) {
        element.classList.toggle("hidden")
    }
}
