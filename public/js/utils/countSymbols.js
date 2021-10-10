const resetCounter = (textarea, counter) => {
    textarea.value = ""
    counter.innerHTML = `0/500`
}

export const countSymbols = (counterNode, textareaNode) => {
    if (counterNode && textareaNode) {
        counterNode.innerHTML = `${textareaNode.value.length}/500`
        textareaNode.addEventListener("input", (event) => {
            const target = event.currentTarget
            counterNode.innerHTML = `${target.value.length}/500`
        })
        return () => resetCounter(textareaNode, counterNode)
    }
    return () => {}
}
