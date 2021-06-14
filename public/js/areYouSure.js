export const areYouSurePrompt = (element, message, callback) => {
    if (element) {
        element.onclick = () => {
            const confirmation = window.confirm(message)
            if (confirmation) {
                callback()
            }
        }
    }
}
