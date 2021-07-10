exports.addCanDeleteField = (comments, userId) => comments.map((comment) => {
        const newComment = { ...comment }
        if (newComment.user.toString() === userId.toString()) {
            newComment.canDelete = true
            return newComment
        }
        newComment.canDelete = false
        return newComment
    })
