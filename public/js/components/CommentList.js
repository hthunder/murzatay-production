import { Comment } from "./Comment"

export class CommentList {
    constructor(articleId, url, addCommentArea) {
        this.commentList = []
        this.articleId = articleId
        if (addCommentArea) {
            this.addCommentArea = addCommentArea
            this.addCommentArea.sendBtn.onclick = () => {
                this.addComment()
            }
        }
        this.url = url
    }

    setListeners(comment) {
        const { textarea } = comment
        comment.deleteBtn.onclick = () => {
            this.deleteComment(comment)
        }
        comment.editBtn.onclick = () => {
            textarea.value = comment.nodeWithText.textContent
            comment.changeEditMode()
            textarea.focus()
            textarea.setSelectionRange(
                textarea.value.length,
                textarea.value.length
            )
        }
        comment.cancelBtn.onclick = () => {
            comment.changeEditMode()
        }
        comment.saveBtn.onclick = () => {
            this.saveComment(comment)
        }
    }

    async getCommentList() {
        try {
            const res = await fetch(this.url)
            if (res.ok) {
                const commentsData = await res.json()
                commentsData.forEach((commentData) => {
                    this.commentList.push(
                        new Comment(commentData, this.articleId)
                    )
                })
                return this.commentList.forEach((comment) => {
                    this.setListeners(comment)
                })
            }
            throw new Error("Произошел сбой при получении списка комментариев")
        } catch (e) {
            return console.error("message", e.message)
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
                this.setListeners(comment)
                return document
                    .querySelector(".topic__js-comments")
                    .prepend(comment.element)
            }
            throw new Error("Не удалось добавить новый комментарий")
        } catch (e) {
            return console.error(e.message)
        }
    }

    async deleteComment(comment) {
        try {
            const res = await fetch(`/api/comments/${comment.id}`, {
                method: "DELETE",
            })
            if (res.ok) {
                this.commentList = this.commentList.filter((currentComment) => {
                    return currentComment.id !== comment.id
                })
                return comment.element.parentNode.removeChild(comment.element)
            }
            throw new Error("Не удалось удалить комментарий")
        } catch (e) {
            return console.error(e.message)
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async saveComment(comment) {
        const isKeepUntouched = () => {
            return (
                comment.textarea.value === "" ||
                comment.textarea.value === comment.nodeWithText.textContent
            )
        }

        try {
            if (isKeepUntouched()) {
                return comment.changeEditMode()
            }
            // TODO поправить пут на патч
            // TODO сделать так, чтобы раут возвращал весь комментарий целиком
            const res = await fetch(`/api/comments/${comment.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: comment.textarea.value }),
            })
            if (res.ok) {
                const resObj = await res.json()
                comment.nodeWithText.textContent = resObj.text
                return comment.changeEditMode()
            }
            throw new Error("Не удалось сохранить изменения")
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
