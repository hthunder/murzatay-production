class HttpError extends Error {
    constructor(errorMsg, statusCode) {
        super(errorMsg)
        this.statusCode = statusCode
    }
}

module.exports = {
    HttpError,
}
