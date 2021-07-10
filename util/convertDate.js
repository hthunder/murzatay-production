exports.convertDate = (comments) => comments.map((comment) => {
        const newComment = { ...comment }
        process.env.TZ = "Europe/Moscow"
        newComment.humanDate = new Date(comment.date).toLocaleString("en-GB")
        newComment.machineDate = comment.date.toISOString()
        return newComment
    })
