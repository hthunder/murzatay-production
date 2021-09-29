import { SidebarInstagramWidget } from "./components/sidebarInstagramWidget"

export const sidebarInstagramWidget = async () => {
    const placeForWidgetEl = document.querySelector(
        ".sidebar__js-instagram-widget"
    )
    if (placeForWidgetEl) {
        try {
            const res = await fetch("/api/widget-urls")
            const widgetData = await res.json()
            SidebarInstagramWidget(placeForWidgetEl, widgetData)
            return "success"
        } catch (e) {
            placeForWidgetEl.remove()
        }
    }
}
