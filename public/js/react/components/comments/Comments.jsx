import { createRoot } from "react-dom/client"
import React, { useState, useEffect } from "react"
import { NewCommentForm } from "./NewCommentForm.jsx"
import { Comment } from "./Comment.jsx"
import { getIdFromSlug } from "../../api/util"
import { getArticleComments } from "../../api/comments"

function Comments() {
    const [comments, setComments] = useState([])
    const [articleId, setArticleId] = useState(null)
    // TODO make comments sorting
    const addComment = (newComment) => {
        setComments((prevState) => {
            return [...prevState, newComment]
        })
    }

    const updateComment = (id, update) => {
        setComments((prevState) => {
            return prevState.map((comment) => {
                if (comment._id === id) {
                    return { ...comment, ...update }
                }
                return comment
            })
        })
    }

    const deleteComment = (id) => {
        setComments((prevState) => {
            return prevState.filter((comment) => {
                return comment._id !== id
            })
        })
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
    }, [])

    return (
        <section className="topic__comments comments">
            <NewCommentForm addComment={addComment} articleId={articleId} />
            {comments.map((comment) => (
                <Comment
                    key={comment._id}
                    data={comment}
                    deleteComment={deleteComment}
                    updateComment={updateComment}
                />
            ))}
        </section>
    )
}

const domContainer = document.querySelector("#react-comments")
const root = createRoot(domContainer)
root.render(<Comments />)
