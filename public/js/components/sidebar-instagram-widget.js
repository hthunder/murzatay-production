const getShownPhotos = (shown) =>
    shown
        .map(
            (
                val
            ) => `<a class="instagram-widget__photo-link" href="https://www.instagram.com">
                <img class="instagram-widget__photo-img" src="/img/tmps/${val}" />
            </a>`
        )
        .join("\n")

const getHiddenPhotos = (hidden) =>
    hidden
        .map(
            (
                val
            ) => `<a class="instagram-widget__photo-link" href="https://www.instagram.com">
                <img class="instagram-widget__photo-img" src="/img/tmps/${val}" />
            </a>`
        )
        .join("\n")

export const SidebarInstagramWidget = (
    rootNode,
    { shownPhotos, hiddenPhotos }
) => {
    rootNode.innerHTML = `
    <a class="instagram-widget__profile-link" href="https://www.instagram.com">
        <img class="instagram-widget__profile-icon" width="50" height="50" src="/img/icons/instagram.svg" />
        murzatay_dakian
    </a>
    <div class="instagram-widget__photos">
        ${getShownPhotos(shownPhotos)}
        <div class="instagram-widget__hidden-photos">
            ${getHiddenPhotos(hiddenPhotos)}
        </div>
    </div>
    <button class="instagram-widget__hide-btn">
        Показать больше фото...
    </button>
    <a class="instagram-widget__subscribe-btn" href="https://www.instagram.com">
        <img class="instagram-widget__subscribe-img" width="15" height="15" src="/img/icons/instagram-without-outline.svg" />
        Открыть Instagram и подписаться
    </a>
    `
}
