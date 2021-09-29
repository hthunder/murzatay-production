const LinkList = (imgList) =>
    imgList
        .map(
            (val) => `<a class="instagram-widget__photo-link" href=${
                val.permalink
            }>
                <img class="instagram-widget__photo-img" src="${
                    val.path.split("public")[1]
                }" />
            </a>`
        )
        .join("\n")

export const SidebarInstagramWidget = (rootNode, { imgList }) => {
    rootNode.innerHTML = `
    <a class="instagram-widget__profile-link" href="https://www.instagram.com">
        <img class="instagram-widget__profile-icon" width="50" height="50" src="/img/icons/instagram.svg" />
        murzatay_dakian
    </a>
    <div class="instagram-widget__photos">
        ${LinkList(imgList.slice(0, 15))}
        <div class="instagram-widget__hidden-photos">
            ${LinkList(imgList.slice(15, 18))}
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
