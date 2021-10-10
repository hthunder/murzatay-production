import { SidebarInstagramWidget } from "../components/sidebarInstagramWidget"

export function showMore() {
    const photos = document.querySelector(".instagram-widget__hidden-photos")
    const button = document.querySelector(".instagram-widget__hide-btn")
    photos.classList.toggle("instagram-widget__hidden-photos_shown")
    button.remove()
}

export const sidebarInstagramWidget = async () => {
    const placeForWidgetEl = document.querySelector(
        ".sidebar__js-instagram-widget"
    )
    if (placeForWidgetEl) {
        try {
            const res = await fetch("/api/widget-urls")
            const widgetData = await res.json()
            SidebarInstagramWidget(placeForWidgetEl, widgetData)
            document.querySelector(".instagram-widget__hide-btn").onclick =
                showMore
        } catch (e) {
            placeForWidgetEl.remove()
        }
    }
}
