import { Comment } from "./Comment"

export class CommentList {
    constructor(articleId, url, addCommentArea) {
        Object.assign(this, {
            commentList: [],
            articleId,
            url,
        })
        if (addCommentArea) {
            this.addCommentArea = addCommentArea
            this.addCommentArea.sendBtn.onclick = () => {
                this.addComment()
            }
        }
    }

    async getCommentList() {
        try {
            const res = await fetch(this.url)
            if (res.ok) {
                const commentsData = await res.json()
                commentsData.forEach((commentData) => {
                    this.commentList.push(new Comment(commentData))
                })
                return
            }
            throw new Error("Произошел сбой при получении списка комментариев")
        } catch (e) {
            console.error("message", e.message)
        }
    }

    async addComment() {
        try {
            const { articleId } = this
            const res = await fetch(`/api/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    articleId,
                    text: this.addCommentArea.textarea.value,
                }),
            })
            if (res.ok) {
                const commentData = await res.json()
                this.commentList.unshift(commentData)
                this.addCommentArea.resetCounter()
                const comment = new Comment(commentData, this.articleId)
                return document
                    .querySelector(".topic__js-comments")
                    .prepend(comment.element)
            }
            throw new Error("Не удалось добавить новый комментарий")
        } catch (e) {
            return console.error(e.message)
        }
    }

    renderTo(targetPlace) {
        this.commentList.forEach((comment) => {
            targetPlace.appendChild(comment.element)
        })
    }
}
