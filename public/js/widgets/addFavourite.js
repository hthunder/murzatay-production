import AWN from "awesome-notifications"
import "awesome-notifications/dist/style.css"

export const addFavourite = () => {
    const favouriteBtn = document.querySelector(".topic__add-favourite")

    async function fetchRequest() {
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

    if (favouriteBtn) {
        favouriteBtn.onclick = fetchRequest
    }
}
