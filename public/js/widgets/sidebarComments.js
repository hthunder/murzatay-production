const populateTemplate = (template) => {
    return ({ text, user }) => {
        const comment = template.content.cloneNode(true)
        const $ctx = comment.querySelector.bind(comment)
        $ctx(".sidebar__comments-text").innerText = text
        $ctx(".sidebar__comments-author").innerText = user.username
        $ctx(".sidebar__comments-img").setAttribute(
            "src",
            `/static/${user.avatar || "img/icons/user-profile.svg"}`
        )
        return comment
    }
}

export const sidebarComments = async () => {
    const $ = document.querySelector.bind(document)
    const lastComments = $(".sidebar__js-last-comments")
    const template = $(".sidebar__js-last-comments-template")

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
