export const SidebarComment = ({ text, user: { username, avatar } }) => {
    const figureEl = document.createElement("figure")
    figureEl.classList.add("sidebar__comments-item")
    figureEl.innerHTML = `
    <img class="sidebar__comments-img" src="${avatar}" width="38" height="38" alt="Аватарка" >
    <figcaption>
        <p class="sidebar__comments-text">${text}</p>
        <p class="sidebar__comments-author">${username}</p>
    </figcaption>
    `
    return figureEl
}
