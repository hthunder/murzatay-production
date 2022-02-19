const populateTemplate = (template) => {
    return ({ text, user }) => {
        const comment = template.content.cloneNode(true)
        comment.querySelector(".sidebar__comments-text").innerText = text
        comment.querySelector(".sidebar__comments-author").innerText =
            user.username
        comment
            .querySelector(".sidebar__comments-img")
            .setAttribute("src", user.avatar || "/img/icons/user-profile.svg")
        return comment
    }
}

export const sidebarComments = async () => {
    const lastComments = document.querySelector(".sidebar__js-last-comments")
    const template = document.querySelector(
        ".sidebar__js-last-comments-template"
    )

    if (lastComments) {
        try {
            const res = await fetch("/api/comments?limit=2")
            const commentsData = await res.json()
            commentsData
                .map(populateTemplate(template))
                .forEach(lastComments.appendChild.bind(lastComments))
        } catch (e) {
            lastComments.remove()
        }
    }
}
