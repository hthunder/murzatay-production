import { createRoot } from "react-dom/client"
import React, { useState, useEffect } from "react"
import { CommentForm } from "./CommentForm.jsx"
import { Comment } from "./Comment.jsx"
import { getIdFromSlug } from "../../api/util"
import {
    getArticleComments,
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi,
    createComment as createCommentApi,
} from "../../api/comments"
import { getAuthInfo } from "../../api/auth.js"

function Comments() {
    const [comments, setComments] = useState([])
    const [articleId, setArticleId] = useState(null)
    const [authInfo, setAuthInfo] = useState(null)
    const [editingId, setEditingId] = useState(null)
    // TODO make comments sorting
    const addComment = async (text, resetText) => {
        try {
            const response = await createCommentApi(articleId, text)
            const newComment = response.data

            setComments((prevState) => {
                return [...prevState, newComment]
            })
            resetText()
        } catch (e) {}
    }

    const updateComment = async (id, text) => {
        try {
            const response = await updateCommentApi(id, text)
            const updatedComment = response.data

            setComments((prevState) => {
                return prevState.map((comment) => {
                    if (comment._id === id) {
                        return { ...comment, ...updatedComment }
                    }
                    return comment
                })
            })
            setEditingId(null)
        } catch (e) {}
    }

    const deleteComment = async (id) => {
        try {
            await deleteCommentApi(id)
            setComments((prevState) => {
                return prevState.filter((comment) => comment._id !== id)
            })
        } catch (e) {}
    }

    useEffect(() => {
        getIdFromSlug()
            .then((id) => {
                setArticleId(id)
                return getArticleComments(id)
            })
            .then((response) => {
                setComments((prevState) => [...prevState, ...response.data])
            })
        getAuthInfo().then(setAuthInfo)
    }, [])

    return (
        <section className="topic__comments comments">
            {authInfo && authInfo.isLoggedIn ? (
                <div className="comments__add-form">
                    <p className="comments__welcome-message">
                        Оставьте свой комментарий
                    </p>
                    <CommentForm sendComment={addComment} />
                </div>
            ) : (
                <p className="comments__unauthorized">
                    Для того чтобы оставить комментарий, войдите или
                    зарегистрируйтесь
                </p>
            )}
            {comments.map((comment) => (
                <Comment
                    key={comment._id}
                    data={comment}
                    authInfo={authInfo}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                    editingId={editingId}
                    setEditingId={setEditingId}
                />
            ))}
        </section>
    )
}

const domContainer = document.querySelector("#react-comments")
const root = createRoot(domContainer)
root.render(<Comments />)
