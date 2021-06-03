export const countSymbols = (counter, textarea) => {
    let counterNode = counter
    let textareaNode = textarea
    if (!counterNode) counterNode = document.querySelector(".comments__symbol-counter")
    if (!textareaNode) textareaNode = document.querySelector(".comments__add-textarea")
    counterNode.innerHTML = `${textareaNode.value.length}/500`
    textareaNode.addEventListener("input", (event) => {
        const target = event.currentTarget
        counterNode.innerHTML = `${target.value.length}/500`
    })
}
