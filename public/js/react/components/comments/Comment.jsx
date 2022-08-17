import React from "react"
import { formatDate } from "../../utils/formatDate.js"
import { CommentForm } from "./CommentForm.jsx"

const canDelete = (userRole, userId, commentOwnerId) => {
    return (
        ["admin", "moderator"].includes(userRole) || userId === commentOwnerId
    )
}

const canEdit = (userId, commentOwnerId) => {
    return userId === commentOwnerId
}

export function Comment(props) {
    const {
        data,
        deleteComment,
        updateComment,
        authInfo,
        editingId,
        setEditingId,
    } = props
    const isEditing = editingId === data._id

    return (
        <article className="comments__instance">
            <img
                className="comments__instance-ava"
                src={`/static${data.user.avatar}`}
                alt="Аватарка"
            />
            <div className="comments__instance-content">
                {isEditing ? (
                    <CommentForm
                        hasCancelBtn={true}
                        cancelEditing={() => {
                            setEditingId(null)
                        }}
                        sendComment={(text) => {
                            updateComment(data._id, text)
                        }}
                        initialText={data.text}
                    />
                ) : (
                    <div className="comments__content">
                        <p className="comments__instance-author">
                            {data.user.username}
                        </p>
                        <p className="comments__instance-text">{data.text}</p>
                        {data.createdAt && (
                            <time className="comments__instance-date">
                                {formatDate(data.createdAt)}
                            </time>
                        )}
                        <div className="comments__actions">
                            {canEdit(authInfo.userId, data.user._id) && (
                                <button
                                    className="button"
                                    type="button"
                                    onClick={() => {
                                        setEditingId(data._id)
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
                                    className="button button_secondary"
                                    type="button"
                                    onClick={() => {
                                        deleteComment(data._id)
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
