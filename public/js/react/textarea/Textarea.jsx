import React from "react"

export const Textarea = (props) => {
    const { maxLength, text, setText } = props

    return (
        <article className="textarea textarea_medium sc-textarea comments__sc-textarea">
            <p className="sc-textarea__counter comments__symbol-counter">
                {`${text.length}/${maxLength}`}
            </p>
            <textarea
                className="sc-textarea__textarea"
                name="text"
                maxLength={maxLength}
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                }}
            />
        </article>
    )
}
