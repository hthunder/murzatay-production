export const addFavourite = () => {
    const favouriteBtn = document.querySelector(".topic__add-favourite")

    async function fetchRequest() {
        const { articleId } = favouriteBtn.dataset
        const { userId } = favouriteBtn.dataset
        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favourites: articleId }),
            })
            if (res.ok) {
                const data = await res.json()
                const isViewLiked = favouriteBtn.classList.contains(
                    "topic__add-favourite_active"
                )
                if (data.favourites !== isViewLiked) {
                    favouriteBtn.classList.toggle("topic__add-favourite_active")
                }
            }
        } catch (e) {
            console.error(e.message)
        }
    }
    if (favouriteBtn) {
        favouriteBtn.onclick = fetchRequest
    }
}
