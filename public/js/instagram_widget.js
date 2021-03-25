export function showMore() {
    const photos = document.querySelector(".instagram-widget__hidden-photos")
    const button = document.querySelector(".instagram-widget__hide-button")
    photos.classList.remove("hidden")
    button.remove()
}
