import AWN from "awesome-notifications"
import "awesome-notifications/dist/style.css"

export async function addFavourite(favouriteBtn) {
    const { articleId, userId } = favouriteBtn.dataset
    try {
        const res = await fetch(`/api/users/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favourites: articleId }),
        })
        if (res.ok) {
            const data = await res.json()
            const isViewLiked = favouriteBtn.classList.contains(
                "topic__add-favourite_active"
            )
            const isFavourite = data.favourites.indexOf(articleId) !== -1
            if (isFavourite !== isViewLiked) {
                favouriteBtn.classList.toggle("topic__add-favourite_active")
            }
        } else {
            throw new Error()
        }
    } catch (e) {
        new AWN().alert("Произошла неизвестная ошибка", {
            durations: { alert: 0 },
        })
    }
}

export const getProfileData = async (userId) => {
    try {
        const res = await fetch(`api/users/${userId}`)
        const userData = await res.json()

        if (!res.ok) {
            const error = new Error()
            error.userMessage = userData.message
            throw error
        }

        return userData
    } catch (e) {
        if (!e.userMessage) e.userMessage = "Произошла неизвестная ошибка"
        new AWN().alert(e.userMessage, {
            durations: { alert: 0 },
        })
    }
}

export const sendNewProfileData = async (userId, formData) => {
    try {
        const res = await fetch(`/api/users/${userId}`, {
            method: "PATCH",
            mode: "same-origin",
            body: formData,
        })

        const userData = await res.json()
        if (!res.ok) {
            const error = new Error()
            error.userMessage = userData.message
            throw error
        }

        return userData
    } catch (e) {
        if (!e.userMessage) e.userMessage = "Произошла неизвестная ошибка"
        new AWN().alert(e.userMessage, {
            durations: { alert: 0 },
        })
    }
}
