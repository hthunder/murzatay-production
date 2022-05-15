exports.concatErrors = (errors) =>
    errors
        .array()
        .map((error) => error.msg)
        .join("\n")
