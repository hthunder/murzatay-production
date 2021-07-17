/* eslint-disable global-require */
module.exports = {
    authErrorHandler: require("./authErrorHandler").authErrorHandler,
    concatErrors: require("./authErrorHandler").concatErrors,
    mailService: require("./mailService").mailService,
    createHash: require("./createHash").createHash,
}
