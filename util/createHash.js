exports.createHash = () => {
    const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let token = ""
    for (let i = 0; i < 25; i += 1) {
        token += characters[Math.floor(Math.random() * characters.length)]
    }
    return token
}
