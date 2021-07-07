export function showMore() {
    const photos = document.querySelector(".instagram-widget__hidden-photos")
    const button = document.querySelector(".instagram-widget__hide-btn")
    photos.classList.toggle("instagram-widget__hidden-photos_shown")
    button.remove()
}
