import { ml } from "../utils/mark"
import { TextAreaWithCounter } from "./TextAreaWithCounter"

export class AddComment {
    constructor() {
        const [textareaWithCounterEl, textareaEl, resetCounter] =
            TextAreaWithCounter(500)
        const sendBtn = ml(
            "button",
            {
                class: "comments__add-button comments__send-button button",
                type: "button",
                "data-id": "",
            },
            "Отправить"
        )
        Object.assign(this, {
            textarea: textareaEl,
            resetCounter,
            sendBtn,
            element: ml("form", { class: "comments__add-form" }, [
                textareaWithCounterEl,
                sendBtn,
            ]),
        })
    }

    renderTo(targetPlace) {
        targetPlace.appendChild(this.element)
    }
}
