export const addFavourite = () => {
    const favouriteBtn = document.querySelector(".topic__add-favourite")

    async function fetchRequest() {
        const { articleId } = favouriteBtn.dataset
        const { userId } = favouriteBtn.dataset
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
            window.createNotification({
                closeOnClick: true,
                displayCloseButton: true,
                positionClass: "nfc-top-right",
                showDuration: "5000",
                theme: "error",
            })({
                message: "Произошла неизвестная ошибка",
            })
        }
    }

    if (favouriteBtn) {
        favouriteBtn.onclick = fetchRequest
    }
}
