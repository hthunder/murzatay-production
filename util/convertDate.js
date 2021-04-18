exports.convertDate = (comments) => {
    return comments.map((comment) => {
        const newComment = { ...comment }
        newComment.date = comment.date
            .toLocaleString("en-GB")
            .split(",")[0]
            .replace(/\//g, ".")
        return newComment
    })
}
