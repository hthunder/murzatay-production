import { countSymbols } from "../utils/countSymbols"

export const TextAreaWithCounter = (maxlength = 200, initText = "") => {
    const textareaWithCounterEl = document.createElement("article")
    textareaWithCounterEl.classList.add(
        "textarea",
        "textarea_medium",
        "sc-textarea",
        "comments__sc-textarea"
    )
    textareaWithCounterEl.insertAdjacentHTML(
        "beforeend",
        `<p class="sc-textarea__counter comments__symbol-counter">
            0/${maxlength}
        </p>
        <textarea class="sc-textarea__textarea" name="text" maxlength="${maxlength}">
            ${initText}
        </textarea>`
    )
    const counterEl = textareaWithCounterEl.querySelector(
        ".sc-textarea__counter"
    )
    const textareaEl = textareaWithCounterEl.querySelector(
        ".sc-textarea__textarea"
    )
    const resetCounter = countSymbols(counterEl, textareaEl)
    return [textareaWithCounterEl, textareaEl, resetCounter]
}
