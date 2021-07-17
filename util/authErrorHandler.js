exports.concatErrors = (errors) =>
    errors
        .array()
        .map((error) => error.msg)
        .join("\n")

exports.authErrorHandler = (res, errMessage, call) => {
    res.cookie("murzatay-error", errMessage).cookie(call, true).redirect("back")
}
