import { CommentList } from "../components/CommentList"
import { AddComment } from "../components/AddComment"

export const commentsInit = async () => {
    const addCommentPlace = document.querySelector(".topic__js-add-comment")
    const commentsContainer = document.querySelector(".topic__js-comments")
    const articleId = commentsContainer?.dataset?.id
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
    commentList.renderTo(commentsContainer)
}
