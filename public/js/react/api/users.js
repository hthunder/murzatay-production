import axios from "axios"

export const getUser = (id) => axios.get(`/api/users/${id || "me"}`)

export const toggleLikeRequest = (isLiked, id) => {
    return isLiked
        ? axios.delete(`/api/users/me/articles/${id}`)
        : axios.put(`/api/users/me/articles/${id}`)
}
