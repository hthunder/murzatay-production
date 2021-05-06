exports.convertDate = (comments) => {
    return comments.map((comment) => {
        const newComment = { ...comment }
        process.env.TZ = 'Europe/Moscow' 
        newComment.date = new Date(comment.date)
            .toLocaleString("en-GB")
            // .split(",")[0]
            // .replace(/\//g, ".")
        return newComment
    })
}
