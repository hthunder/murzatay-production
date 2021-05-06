const { LONG_COMMENT, NOT_LOGGED_IN } = require("../constants")

exports.errorHandler = (errorType, res) => {
    const errorStatuses = {
        [LONG_COMMENT]: 400,
        [NOT_LOGGED_IN]: 401,
        default: 400,
    }
    if (errorType in errorStatuses)
        return res.status(errorStatuses[errorType]).json({ error: errorType })
    return res.status(errorStatuses.default).json({ error: errorType })
}
