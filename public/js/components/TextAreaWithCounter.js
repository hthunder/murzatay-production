import { ml } from "../utils/mark"
import { countSymbols } from "../utils/countSymbols"

export const TextAreaWithCounter = (maxlength = 200, initText = "") => {
    const counter = ml(
        "p",
        {
            class: "sc-textarea__counter comments__symbol-counter",
        },
        `0/${maxlength}`
    )
    const textarea = ml(
        "textarea",
        {
            class: "sc-textarea__textarea",
            name: "text",
            maxlength,
        },
        initText
    )
    const textareaWrapper = ml(
        "article",
        {
            class: `textarea textarea_medium sc-textarea comments__sc-textarea`,
        },
        [counter, textarea]
    )
    const resetCounter = countSymbols(counter, textarea)
    return [textareaWrapper, textarea, resetCounter]
}
