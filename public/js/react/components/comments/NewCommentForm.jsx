import React, { useState, useEffect } from "react"
import axios from "axios"
import { MAX_LENGTH } from "./constants.js"
import { Textarea } from "../textarea/Textarea.jsx"
import { getLoggedInValue } from "../../api/auth.js"

export function NewCommentForm(props) {
    const { addComment, articleId } = props
    const [text, setText] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        getLoggedInValue().then(setIsLoggedIn)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        if (articleId) {
            axios
                .post("/api/comments", {
                    articleId,
                    text,
                })
                .then((response) => {
                    setText("")
                    addComment(response.data)
                })
        }
    }

    return (
        <>
            {isLoggedIn ? (
                <>
                    <p className="comments__welcome-message">
                        Оставьте свой комментарий
                    </p>
                    <form className="comments__add-form" onSubmit={onSubmit}>
                        <Textarea
                            maxLength={MAX_LENGTH}
                            text={text}
                            setText={setText}
                        />
                        <button
                            className="comments__add-button comments__send-button button"
                            type="submit"
                            data-id=""
                        >
                            Отправить
                        </button>
                    </form>
                </>
            ) : (
                <p className="comments__unauthorized">
                    Для того чтобы оставить комментарий, войдите или
                    зарегистрируйтесь
                </p>
            )}
        </>
    )
}
