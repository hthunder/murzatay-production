export const addFavourite = () => {
    const favouriteBtn = document.querySelector(".topic__add-favourite")

    async function fetchRequest() {
        const { articleId } = favouriteBtn.dataset
        const { userId } = favouriteBtn.dataset
        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favourites: `${articleId}` }),
            })
            const data = await res.json()
            if (
                (data.favourites &&
                    !favouriteBtn.classList.contains(
                        "topic__add-favourite_active"
                    )) ||
                (!data.favourites &&
                    favouriteBtn.classList.contains(
                        "topic__add-favourite_active"
                    ))
            ) {
                favouriteBtn.classList.toggle("topic__add-favourite_active")
            }
        } catch (e) {
            console.log(e)
        }
    }
    if (favouriteBtn) {
        favouriteBtn.onclick = fetchRequest
    }
}
