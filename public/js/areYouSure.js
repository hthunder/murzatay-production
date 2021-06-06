export const areYouSurePrompt = (element, message, callback) => {
    if (element) {
        element.onclick = () => {
            const confirmation = confirm(message)
            if (confirmation) {
                callback()
            }
        }    
    }
}