import * as api from "../api/api"

export function initArticleRemovingHandlers() {
    const deleteArticleForms = document.querySelectorAll(
        ".articles__delete-form"
    )
    deleteArticleForms.forEach((form) => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault()
            const shouldDelete = window.confirm(
                "Вы уверены, что хотите удалить эту статью?"
            )
            if (shouldDelete) {
                try {
                    const res = await api.deleteArticle(form.dataset.articleId)
                    if (res.ok) {
                        return form.closest(".articles__item").remove()
                    }
                    throw new Error("Произошел сбой при удалении статьи")
                } catch (e) {
                    console.error(e.message)
                }
            }
            return false
        })
    })
}
