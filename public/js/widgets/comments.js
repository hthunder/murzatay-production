import { CommentList } from "../components/CommentList"
import { AddComment } from "../components/AddComment"

const getArticleId = (allCommentsPlace) => {
    return (
        allCommentsPlace &&
        allCommentsPlace.dataset &&
        allCommentsPlace.dataset.id
    )
}

export const commentsInit = async () => {
    const addCommentPlace = document.querySelector(".topic__js-add-comment")
    const allCommentsPlace = document.querySelector(".topic__js-comments")
    const articleId = getArticleId(allCommentsPlace)
    const addCommentArea = addCommentPlace ? new AddComment() : null

    if (addCommentPlace) {
        addCommentArea.renderTo(addCommentPlace)
    }
    const commentList = new CommentList(
        articleId,
        `/api/articles/${articleId}/comments`,
        addCommentArea
    )
    await commentList.getCommentList()
    commentList.renderTo(allCommentsPlace)
}
