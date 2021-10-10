import { CommentList } from "../components/CommentList"
import { AddComment } from "../components/AddComment"

export const commentsInit = async () => {
    const addCommentPlace = document.querySelector(".topic__js-add-comment")
    const allCommentsPlace = document.querySelector(".topic__js-comments")
    const articleId =
        allCommentsPlace &&
        allCommentsPlace.dataset &&
        allCommentsPlace.dataset.id

    if (addCommentPlace) {
        const addCommentArea = new AddComment()
        const commentList = new CommentList(
            articleId,
            `/api/articles/${articleId}/comments`,
            addCommentArea
        )
        addCommentArea.render(addCommentPlace)
        await commentList.getCommentList()
        commentList.render(allCommentsPlace)
    }
}
