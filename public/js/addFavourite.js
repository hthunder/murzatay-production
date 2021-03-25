export const addFavourite = () => {
    const favouriteBtn = document.querySelector(".add-favourite")

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
                    !favouriteBtn.classList.contains("add-favourite-active")) ||
                (!data.favourites &&
                    favouriteBtn.classList.contains("add-favourite-active"))
            ) {
                favouriteBtn.classList.toggle("add-favourite-active")
            }
        } catch (e) {
            console.log(e)
        }
    }
    if (favouriteBtn) {
        favouriteBtn.onclick = fetchRequest
    }
}
