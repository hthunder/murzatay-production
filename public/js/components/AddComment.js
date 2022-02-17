import { countSymbols } from "../utils/countSymbols"

const getAddCommentHTML = () => {
    return `
    <article class="textarea textarea_medium sc-textarea comments__sc-textarea">
        <p class="sc-textarea__counter comments__symbol-counter">0/500</p>
        <textarea class="sc-textarea__textarea" name="text" maxlength="500"></textarea>    
    </article>
    <button class="comments__add-button comments__send-button button" type="button"  data-id="">Отправить</button>`
}

export class AddComment {
    constructor() {
        this.element = document.createElement("form")
        this.element.classList.add("comments__add-form")
        this.element.innerHTML = getAddCommentHTML()
        this.textarea = this.element.querySelector(".sc-textarea__textarea")
        this.counter = this.element.querySelector(".comments__symbol-counter")
        this.sendBtn = this.element.querySelector(".comments__send-button")
        this.resetCounter = countSymbols(this.counter, this.textarea)
    }

    renderTo(targetPlace) {
        targetPlace.appendChild(this.element)
    }
}
