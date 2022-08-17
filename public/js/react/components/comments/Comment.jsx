import axios from "axios"
import React, { useState } from "react"
import { MAX_LENGTH } from "./constants.js"
import { Textarea } from "../textarea/Textarea.jsx"
import { formatDate } from "../../utils/formatDate.js"

const canDelete = (userRole, userId, commentOwnerId) => {
    return (
        ["admin", "moderator"].includes(userRole) || userId === commentOwnerId
    )
}

const canEdit = (userId, commentOwnerId) => {
    return userId === commentOwnerId
}

export function Comment(props) {
    const { data, deleteComment, updateComment, authInfo } = props
    const [text, setText] = useState(data.text)
    const [isEditing, setIsEditing] = useState(false)

    const deleteRequest = (commentId) => {
        axios.delete(`/api/comments/${commentId}`).then(() => {
            deleteComment(commentId)
        })
    }

    const saveRequest = (commentId) => {
        axios.put(`/api/comments/${commentId}`, { text }).then((response) => {
            updateComment(commentId, response.data)
            setIsEditing(false)
        })
    }

    return (
        <article className="comments__instance">
            <img
                className="comments__instance-ava"
                src={`/static${data.user.avatar}`}
                alt="Аватарка"
            />
            <div className="comments__instance-content">
                {isEditing ? (
                    <form className="comments__form">
                        <Textarea
                            maxLength={MAX_LENGTH}
                            text={text}
                            setText={setText}
                        />
                        <button
                            className="comments__save-button button"
                            type="button"
                            onClick={() => {
                                saveRequest(data._id)
                            }}
                        >
                            Сохранить
                        </button>
                        <button
                            className="comments__cancel-button button"
                            type="button"
                            onClick={() => {
                                setIsEditing(false)
                                setText(data.text)
                            }}
                        >
                            Отменить
                        </button>
                    </form>
                ) : (
                    <div className="comments__content">
                        <p className="comments__instance-author">
                            {data.user.username}
                        </p>
                        <p className="comments__instance-text">{data.text}</p>
                        <time className="comments__instance-date">
                            {formatDate(data.date)}
                        </time>
                        <div className="comments__actions">
                            {canEdit(authInfo.userId, data.user._id) && (
                                <button
                                    className="button comments__edit-button"
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(true)
                                    }}
                                >
                                    Редактировать
                                </button>
                            )}
                            {canDelete(
                                authInfo.userRole,
                                authInfo.userId,
                                data.user._id
                            ) && (
                                <button
                                    className="button button_secondary comments__delete-button"
                                    type="button"
                                    onClick={() => {
                                        deleteRequest(data._id)
                                    }}
                                >
                                    Удалить
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}
