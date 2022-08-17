import React, { useState } from "react"
import { MAX_LENGTH } from "./constants.js"
import { Textarea } from "../textarea/Textarea.jsx"

export function CommentForm(props) {
    const { hasCancelBtn, sendComment, cancelEditing, initialText = "" } = props
    const [text, setText] = useState(initialText)

    const resetText = () => {
        setText("")
    }

    return (
        <form>
            <Textarea maxLength={MAX_LENGTH} text={text} setText={setText} />
            <button
                className="button"
                type="button"
                onClick={() => {
                    sendComment(text, resetText)
                }}
            >
                Отправить
            </button>
            {hasCancelBtn && (
                <button
                    className="button button_secondary"
                    type="button"
                    onClick={() => {
                        cancelEditing()
                    }}
                >
                    Отменить
                </button>
            )}
        </form>
    )
}
