import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { getIdFromSlug } from "../../api/util"
import { getUser, toggleLikeRequest } from "../../api/users"

export function LikeButton() {
    const [articleId, setArticleId] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        Promise.all([getUser(), getIdFromSlug()]).then(([response, id]) => {
            if (response.data && id) {
                const favourites = response.data.favourites
                setIsLoggedIn(true)
                setArticleId(id)
                setIsLiked(favourites.includes(id))
            }
        })
    }, [])

    const toggleLike = () => {
        toggleLikeRequest(isLiked, articleId).then(() => {
            setIsLiked(!isLiked)
        })
    }

    return isLoggedIn ? (
        <button
            onClick={toggleLike}
            className={`topic__add-favourite ${
                isLiked ? "topic__add-favourite_active" : ""
            }`}
        />
    ) : null
}

const domContainer = document.querySelector("#react-like")
const root = createRoot(domContainer)
root.render(<LikeButton />)
