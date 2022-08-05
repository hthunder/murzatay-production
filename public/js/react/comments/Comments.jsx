import { createRoot } from "react-dom/client"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { NewCommentForm } from "./NewCommentForm.jsx"
import { Comment } from "./Comment.jsx"

function Comments() {
    const [comments, setComments] = useState([])
    const [articleId, setArticleId] = useState(null)

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
        const slug = window.location.pathname.split("/")[2] // TODO test this function in edge cases
        axios
            .get(`/api/id_from_slug?slug=${slug}`)
            .then((response) => {
                const { id } = response.data
                setArticleId(id)
                return axios.get(`/api/articles/${id}/comments`)
            })
            .then((response) => {
                setComments([...response.data])
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
