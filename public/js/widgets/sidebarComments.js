import { SidebarComment } from "../components/sidebarComment"

export const sidebarComments = async () => {
    const placeForCommentsEl = document.querySelector(
        ".sidebar__js-last-comments"
    )
    if (placeForCommentsEl) {
        try {
            const res = await fetch("/api/comments?limit=2")
            const commentsData = await res.json()
            const headlineEl = document.createElement("h3")

            headlineEl.classList.add("sidebar__title")
            headlineEl.innerText = "Комментарии"
            placeForCommentsEl.appendChild(headlineEl)
            commentsData.map((commentData) =>
                placeForCommentsEl.appendChild(SidebarComment(commentData))
            )
        } catch (e) {
            placeForCommentsEl.remove()
        }
    }
}
