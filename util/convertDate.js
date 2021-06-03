exports.convertDate = (comments) => {
    return comments.map((comment) => {
        const newComment = { ...comment }
        process.env.TZ = "Europe/Moscow"
        newComment.humanDate = new Date(comment.date).toLocaleString("en-GB")
        newComment.machineDate = comment.date.toISOString()
        // .split(",")[0]
        // .replace(/\//g, ".")
        return newComment
    })
}
