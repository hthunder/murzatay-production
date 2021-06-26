import { SidebarComment } from "./components/sidebar-comment"

export const sidebarComments = async () => {
    const placeForCommentsEl = document.querySelector(
        ".sidebar__js-last-comments"
    )
    if (placeForCommentsEl) {
        const res = await fetch("/api/comments?limit=2")
        const commentsData = await res.json()
        const headlineEl = document.createElement("h3")
        headlineEl.classList.add("sidebar__title")
        headlineEl.innerText = "Комментарии"
        const commentsContainerEl = document.createElement("div")
        placeForCommentsEl.appendChild(headlineEl)
        placeForCommentsEl.appendChild(commentsContainerEl)
        commentsData.map((commentData) =>
            placeForCommentsEl.appendChild(SidebarComment(commentData))
        )
    }
}
