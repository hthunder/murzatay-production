require("dotenv").config()

const NODE_ENVIRONMENT = process.env.NODE_ENV || "development"

function logErrorMessage(error) {
    return console.error(error.stack || error.message || "Unknown Error") // TODO change it to any logger library
}

function isErrorStatusCode(statusCode) {
    return statusCode >= 400 && statusCode < 600
}

function getHttpStatusCode({ error, response }) {
    const statusCodeFromError = error.status || error.statusCode
    if (isErrorStatusCode(statusCodeFromError)) {
        return statusCodeFromError
    }

    // The existing response 'statusCode'. This is 200 (OK)
    // by default in Express, but a route handler or middleware
    // might already have set an error HTTP status code
    const statusCodeFromResponse = response.statusCode
    if (isErrorStatusCode(statusCodeFromResponse)) {
        return statusCodeFromResponse
    }

    return 500
}

exports.errorHandlerMiddleware = (error, req, res, next) => {
    console.log("route", req.originalUrl)
    logErrorMessage(error)

    // If response headers have already been sent,
    // delegate to the default Express error handler.
    if (res.headersSent) {
        return next(error)
    }

    const responseBody = {}

    if (NODE_ENVIRONMENT !== "production") {
        responseBody.stack = error.stack
    }
    responseBody.message = error.message || "Unknown Error"

    const statusCode = getHttpStatusCode({ error, res })
    res.status(statusCode)

    res.format({
        // Callback to run when 'Accept' header contains either
        // 'application/json' or '*/*', or if it isn't set at all.
        "application/json": () => {
            res.json(responseBody)
        },
        default: () => {
            res.type("text/plain").send(JSON.stringify(responseBody))
        },
    })

    return next()
}
