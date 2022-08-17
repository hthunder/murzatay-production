import axios from "axios"

export const getArticleComments = (id) =>
    axios.get(`/api/articles/${id}/comments`)

export const getSidebarComments = () => axios.get("/api/comments?limit=2")

export const deleteComment = (id) => axios.delete(`/api/comments/${id}`)

export const updateComment = (id, text) =>
    axios.put(`/api/comments/${id}`, { text })

export const createComment = (articleId, text) =>
    axios.post("/api/comments", {
        articleId,
        text,
    })
