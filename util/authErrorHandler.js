exports.concatErrors = (errors) =>
    errors
        .array()
        .map((error) => error.msg)
        .join("\n")

exports.authErrorHandler = (res, errMessage, call, req) => {
    const backUrl = req.header("referer") || "/"
    const queryParams = new URLSearchParams({
        "murzatay-error": errMessage,
        [call]: true,
    })
    res.redirect(`${backUrl}?${queryParams}`)
}
