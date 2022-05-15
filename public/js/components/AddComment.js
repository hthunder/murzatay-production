import { ml } from "../utils/mark"
import { TextAreaWithCounter } from "./TextAreaWithCounter"

export class AddComment {
    constructor() {
        const [textareaWrapper, textarea, resetCounter] =
            TextAreaWithCounter(500)
        this.textarea = textarea
        this.resetCounter = resetCounter
        this.sendBtn = ml(
            "button",
            {
                class: "comments__add-button comments__send-button button",
                type: "button",
                "data-id": "",
            },
            "Отправить"
        )
        this.element = ml("form", { class: "comments__add-form" }, [
            textareaWrapper,
            this.sendBtn,
        ])
    }

    renderTo(targetPlace) {
        targetPlace.appendChild(this.element)
    }
}
