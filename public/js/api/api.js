export const deleteArticle = async (articleId) =>
    fetch(`/api/articles/${articleId}`, {
        method: "DELETE",
    })
