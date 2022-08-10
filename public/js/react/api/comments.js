import axios from "axios"

export const getArticleComments = (id) =>
    axios.get(`/api/articles/${id}/comments`)
