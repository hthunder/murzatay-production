import axios from "axios"

export const getArticleComments = (id) =>
    axios.get(`/api/articles/${id}/comments`)

export const getSidebarComments = () => axios.get("/api/comments?limit=2")
