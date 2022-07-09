import { CommentList } from "../components/CommentList"
import { AddComment } from "../components/AddComment"

export const commentsInit = async () => {
    const addCommentContainerEl = document.querySelector(
        ".topic__js-add-comment"
    )
    const addCommentArea = addCommentContainerEl ? new AddComment() : null
    addCommentArea?.renderTo(addCommentContainerEl)

    const commentsContainerEl = document.querySelector(".topic__js-comments")
    const articleId = commentsContainerEl?.dataset?.id
    const commentList = new CommentList(
        articleId,
        `/api/articles/${articleId}/comments`,
        addCommentArea
    )
    await commentList.getCommentList()
    commentList.renderTo(commentsContainerEl)
}
