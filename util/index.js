/* eslint-disable global-require */
module.exports = {
    concatErrors: require("./authErrorHandler").concatErrors,
    mailService: require("./mailService").mailService,
    createHash: require("./createHash").createHash,
}
